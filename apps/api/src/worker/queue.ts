import { Queue, Worker } from 'bullmq';
import IORedis from 'ioredis';
import { renderSocialPost } from './renderer';

import { generatePostContent, generatePostImage } from '../core/ai';
import { uploadFile } from '../core/storage';
import { supabase } from '../core/supabase';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

export const renderQueue = new Queue('render-queue', {
    connection: new IORedis(redisUrl, { maxRetriesPerRequest: null }) as any
});

export const startWorker = () => {
    const worker = new Worker('render-queue', async job => {
        console.log(`Processing job ${job.id}...`);
        const { templateId, data, format } = job.data;

        if (templateId !== 'SocialPost') {
            throw new Error('Template not supported');
        }

        // AI Generation Flow
        const finalData = { ...data };

        if (data.topic && (!data.title || !data.image)) {
            console.log(`✨ AI Generation started for topic: ${data.topic}`);
            await job.updateProgress(10);

            // 1. Generate Copy
            const aiContent = await generatePostContent(data.topic);
            console.log(`📝 AI Copy generated: ${aiContent.title}`);

            if (!data.title) finalData.title = aiContent.title;
            if (!data.subtitle) finalData.subtitle = aiContent.subtitle;
            await job.updateProgress(30);

            // 2. Generate Image
            const aiImageUrl = await generatePostImage(aiContent.imagePrompt);
            console.log(`🖼️ AI Image generated: ${aiImageUrl}`);

            if (!data.image) finalData.image = aiImageUrl;
            await job.updateProgress(60);
        }

        const localFilePath = await renderSocialPost(finalData, `job-${job.id}`, format);

        // Storage Upload Flow
        let finalUrl = `/outputs/job-${job.id}.${format}`;

        if (process.env.AWS_ACCESS_KEY_ID && process.env.S3_BUCKET_NAME) {
            console.log(`☁️ Uploading result to cloud storage...`);
            await job.updateProgress(90);
            try {
                finalUrl = await uploadFile(localFilePath, process.env.S3_BUCKET_NAME);
            } catch (err) {
                console.error('Failed to upload to S3, falling back to local URL', err);
            }
        }

        await job.updateProgress(100);
        return { url: finalUrl };

    }, {
        connection: new IORedis(redisUrl, { maxRetriesPerRequest: null }) as any
    });

    worker.on('completed', async (job) => {
        console.log(`Job ${job.id} has completed!`);
        if (job.data.renderId) {
            await supabase.from('renders').update({
                status: 'completed',
                output_url: job.returnvalue?.url
            }).eq('id', job.data.renderId);
        }
    });

    worker.on('failed', async (job, err) => {
        console.log(`Job ${job?.id} has failed with ${err.message}`);
        if (job && job.data.renderId) {
            await supabase.from('renders').update({
                status: 'failed'
            }).eq('id', job.data.renderId);

            if (job.data.userId) {
                const { data: profile } = await supabase.from('profiles').select('credits_balance').eq('id', job.data.userId).single();
                if (profile) {
                    await supabase.from('profiles').update({ credits_balance: profile.credits_balance + 1 }).eq('id', job.data.userId);
                }
            }
        }
    });

    console.log('Worker started...');
};
