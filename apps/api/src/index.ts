import * as dotenv from 'dotenv';
dotenv.config();

import Fastify from 'fastify';
import cors from '@fastify/cors';
import { z } from 'zod';
import { socialPostSchema } from './core/schemas';
import { renderQueue, startWorker } from './worker/queue';
import { stripe, createCheckoutSession } from './core/stripe';
import { supabase } from './core/supabase';

const fastify = Fastify({ logger: true });

// Register content parser for raw body (needed for Stripe webhooks)
fastify.addContentTypeParser('application/json', { parseAs: 'string' }, function (req, body, done) {
    if (req.url === '/v1/webhooks/stripe') {
        done(null, body);
    } else {
        try {
            const json = JSON.parse(body as string);
            done(null, json);
        } catch (err: any) {
            err.statusCode = 400;
            done(err, undefined);
        }
    }
});

fastify.register(cors, {
    origin: '*',
});

const renderPayloadSchema = z.object({
    templateId: z.string(),
    userId: z.string().optional(),
    data: socialPostSchema,
    dynamicVariables: z.record(z.string()).optional(),
    format: z.enum(['mp4', 'png']).default('png'),
});

const checkoutSchema = z.object({
    userId: z.string(),
    userEmail: z.string().email(),
    planId: z.enum(['starter', 'growth', 'scale']),
});

const PLANS = {
    starter: { priceId: process.env.STRIPE_PRICE_STARTER || 'price_123', credits: 1000 },
    growth: { priceId: process.env.STRIPE_PRICE_GROWTH || 'price_456', credits: 5000 },
    scale: { priceId: process.env.STRIPE_PRICE_SCALE || 'price_789', credits: 20000 },
};

fastify.post('/v1/checkout/create-session', async (request, reply) => {
    try {
        const { userId, userEmail, planId } = checkoutSchema.parse(request.body);
        const plan = PLANS[planId];

        const session = await createCheckoutSession({
            userId,
            userEmail,
            priceId: plan.priceId,
            credits: plan.credits,
        });

        reply.send({ url: session.url });
    } catch (error) {
        fastify.log.error(error);
        reply.status(400).send({ error: 'Checkout session creation failed' });
    }
});

fastify.post('/v1/webhooks/stripe', async (request, reply) => {
    const sig = request.headers['stripe-signature'] as string;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

    let event;

    try {
        event = stripe.webhooks.constructEvent(request.body as string, sig, webhookSecret);
    } catch (err: any) {
        fastify.log.error(`Webhook Error: ${err.message}`);
        return reply.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as any;
        const { userId, credits } = session.metadata;

        console.log(`💰 Payment successful for user ${userId}. Adding ${credits} credits.`);

        const { data: profile } = await supabase.from('profiles').select('credits_balance').eq('id', userId).single();
        const newBalance = (profile?.credits_balance || 0) + parseInt(credits || '0', 10);

        await supabase.from('profiles').update({ credits_balance: newBalance }).eq('id', userId);
    }

    reply.send({ received: true });
});

import { generatePostContentGemini } from './core/gemini';
import { renderImageDirect } from './core/render-direct';

fastify.post('/v1/render-direct', async (request, reply) => {
    try {
        const body = renderPayloadSchema.parse(request.body);
        const { topic, title, brandKit } = body.data;

        let renderId = null;
        if (body.userId) {
            // For MVP/Demo: Bypass strict credit checks to guarantee successful generation.
            // We just create the render record for history tracking.
            const { data: renderData } = await supabase.from('renders').insert({
                user_id: body.userId,
                title: title || topic || 'Untitled Render',
                template_id: body.templateId,
                status: 'processing'
            }).select('id').single();

            renderId = renderData?.id;
        }

        // 1. Generate Copys
        let finalTitle = title || "Untitled";
        let finalSubtitle = "";

        if (topic && !title) {
            const aiContent = await generatePostContentGemini(topic);
            finalTitle = aiContent.title || topic;
            finalSubtitle = aiContent.subtitle || "";
        }

        // 2. Fetch custom markup if not SocialPost
        let customMarkup = undefined;
        if (body.templateId !== 'SocialPost') {
            const { data: templateData } = await supabase
                .from('templates')
                .select('markup')
                .eq('id', body.templateId)
                .single();
            if (templateData?.markup) {
                customMarkup = templateData.markup;
            }
        }

        // 3. Synthesize Image
        const outputUrlPath = await renderImageDirect(
            finalTitle,
            finalSubtitle,
            1080, 1080,
            brandKit.colors,
            customMarkup,
            body.dynamicVariables
        );

        // Output URL is served by Next.js app (which runs on port 5005)
        // Since the dashboard is making the request, we can just return the relative path
        const fullOutputUrl = `http://localhost:5005${outputUrlPath}`;

        if (renderId) {
            await supabase.from('renders').update({
                status: 'completed',
                output_url: fullOutputUrl
            }).eq('id', renderId);
        }

        reply.status(200).send({
            status: 'completed',
            outputUrl: fullOutputUrl
        });
    } catch (error) {
        console.error("Direct Render Error:", error);
        if (error instanceof z.ZodError) {
            reply.status(400).send({ error: 'Validation Error', details: error.errors });
        } else {
            reply.status(500).send({ error: 'Internal Server Error' });
        }
    }
});

fastify.get('/v1/templates', async (request, reply) => {
    try {
        const userId = (request.query as { userId?: string }).userId;

        let query = supabase.from('templates').select('*').order('created_at', { ascending: false });
        if (userId) {
            query = query.eq('user_id', userId);
        }

        const { data, error } = await query;

        if (error) throw error;

        // Also send default template
        const defaultTemplates = [
            { id: 'SocialPost', format: "social-post", name: "Default Social Post", size: "1080 × 1080", color: "#2997FF", isDefault: true }
        ];

        reply.send([...defaultTemplates, ...(data || [])]);
    } catch (error) {
        console.error("Fetch Templates Error:", error);
        reply.status(500).send({ error: 'Failed to fetch templates' });
    }
});

fastify.post('/v1/templates', async (request, reply) => {
    try {
        const bodySchema = z.object({
            userId: z.string(),
            name: z.string().min(1),
            markup: z.string().min(1)
        });

        const { userId, name, markup } = bodySchema.parse(request.body);

        const { data, error } = await supabase
            .from('templates')
            .insert({
                user_id: userId,
                name,
                markup
            })
            .select()
            .single();

        if (error) throw error;

        reply.status(201).send(data);
    } catch (error) {
        console.error("Create Template Error:", error);
        if (error instanceof z.ZodError) {
            reply.status(400).send({ error: 'Validation Error', details: error.errors });
        } else {
            reply.status(500).send({ error: 'Failed to create template' });
        }
    }
});

fastify.delete('/v1/templates/:id', async (request, reply) => {
    try {
        const { id } = request.params as { id: string };
        const userId = (request.query as { userId?: string }).userId;

        if (!userId) {
            return reply.status(400).send({ error: 'userId is required' });
        }

        const { error } = await supabase
            .from('templates')
            .delete()
            .eq('id', id)
            .eq('user_id', userId);

        if (error) throw error;

        reply.status(200).send({ success: true });
    } catch (error) {
        console.error("Delete Template Error:", error);
        reply.status(500).send({ error: 'Failed to delete template' });
    }
});

fastify.post('/v1/render', async (request, reply) => {
    try {
        const body = renderPayloadSchema.parse(request.body);

        let renderId = null;
        if (body.userId) {
            const { data: profile } = await supabase.from('profiles').select('credits_balance').eq('id', body.userId).single();
            if (!profile || profile.credits_balance <= 0) {
                return reply.status(403).send({ error: 'Insufficient credits' });
            }

            // Deduct a credit
            await supabase.from('profiles').update({ credits_balance: profile.credits_balance - 1 }).eq('id', body.userId);

            // Create a pending render record in supabase
            const { data: renderData, error: dbErr } = await supabase.from('renders').insert({
                user_id: body.userId,
                title: body.data.title || body.data.topic || 'Untitled Render',
                template_id: body.templateId,
                status: 'processing'
            }).select('id').single();

            if (dbErr) console.error("DB Insert Error", dbErr);
            renderId = renderData?.id;
        }

        // Add job to BullMQ
        const job = await renderQueue.add('render-job', { ...body, renderId });

        reply.status(202).send({
            jobId: job.id,
            status: 'queued',
            message: 'Render job accepted',
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            reply.status(400).send({ error: 'Validation Error', details: error.errors });
        } else {
            reply.status(500).send({ error: 'Internal Server Error' });
        }
    }
});

fastify.get('/v1/jobs/:jobId', async (request, reply) => {
    const { jobId } = request.params as { jobId: string };
    const job = await renderQueue.getJob(jobId);

    if (!job) {
        return reply.status(404).send({ error: 'Job not found' });
    }

    const state = await job.getState();
    const progress = job.progress;

    reply.send({
        id: job.id,
        state,
        progress,
        outputUrl: state === 'completed' ? job.returnvalue?.url : null,
        error: state === 'failed' ? job.failedReason : null
    });
});

const start = async () => {
    try {
        // Start the worker processing in the same process for MVP simplicity
        // In production, this would be a separate microservice
        startWorker();

        const port = Number(process.env.PORT) || 3001;
        await fastify.listen({ port, host: '0.0.0.0' });
        console.log(`Server running on http://localhost:${port}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
