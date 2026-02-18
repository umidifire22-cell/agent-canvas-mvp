import { Queue, Worker } from 'bullmq';
import IORedis from 'ioredis';
import { renderSocialPost } from './renderer';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

export const renderQueue = new Queue('render-queue', {
    connection: new IORedis(redisUrl, { maxRetriesPerRequest: null }) as any
});

export const startWorker = () => {
    const worker = new Worker('render-queue', async job => {
        console.log(`Processing job ${job.id}...`);
        const { templateId, data, format } = job.data;

        // For MVP, we only support SocialPost
        if (templateId !== 'SocialPost') {
            throw new Error('Template not supported');
        }

        await renderSocialPost(data, `job-${job.id}`, format);

    }, {
        connection: new IORedis(redisUrl, { maxRetriesPerRequest: null }) as any
    });

    worker.on('completed', job => {
        console.log(`Job ${job.id} has completed!`);
    });

    worker.on('failed', (job, err) => {
        console.log(`Job ${job!.id} has failed with ${err.message}`);
    });

    console.log('Worker started...');
};
