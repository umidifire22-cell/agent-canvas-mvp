import Fastify from 'fastify';
import cors from '@fastify/cors';
import { z } from 'zod';
import { socialPostSchema } from './core/schemas';
import { renderQueue, startWorker } from './worker/queue';

const fastify = Fastify({ logger: true });

fastify.register(cors, {
    origin: '*',
});

const renderPayloadSchema = z.object({
    templateId: z.literal('SocialPost'),
    data: socialPostSchema,
    format: z.enum(['mp4', 'png']).default('png'),
});

fastify.post('/v1/render', async (request, reply) => {
    try {
        const body = renderPayloadSchema.parse(request.body);

        // Add job to BullMQ
        const job = await renderQueue.add('render-job', body);

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
        outputUrl: state === 'completed' ? `/outputs/${job.id}.${job.data.format}` : null,
        error: state === 'failed' ? job.failedReason : null
    });
});

const start = async () => {
    try {
        // Start the worker processing in the same process for MVP simplicity
        // In production, this would be a separate microservice
        startWorker();

        await fastify.listen({ port: 3000, host: '0.0.0.0' });
        console.log('Server running on http://localhost:3000');
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
