import { OnQueueActive, OnQueueCompleted, OnQueueError, OnQueuePaused, Process, Processor } from "@nestjs/bull";
import { Job, DoneCallback } from "bull";
import { UploadImageContent } from "./interfaces/interface";
import { uploadToS3 } from "src/utils/s3.utils";
import { sleep } from "./utils/util";

@Processor('imageUpload')
export class ImageUploaderProcessor {
    @Process('upload-image')
    async handleImageUpload(job: Job, done: DoneCallback) {
        // await uploadToS3(file, bucket, name, mimetype);

        try {
            job.progress(10);
            await sleep(1000);
            job.log('Processing image at 10%...');

            job.progress(20);
            await sleep(2000);
            job.log('Processing image at 20%...');

            job.progress(30);
            await sleep(3000);
            job.log('Processing image at 30%...');

            throw new Error('Something went wrong at 40%...');
            job.progress(40);
            await sleep(5000);
            job.log('Processing image at 40%...');


            job.progress(50);
            await sleep(6000);
            job.log('Processing image at 50%...');


            job.progress(60);
            await sleep(7000);
            job.log('Processing image at 60%...');

            job.progress(70);
            await sleep(8000);
            job.log('Processing image at 70%...');


            job.progress(80);
            await sleep(9000);
            job.log('Processing image at 80%...');

            job.progress(90);
            await sleep(11000);
            job.log('Processing image at 90%...');

            job.progress(100);
            job.log('Processing image at 100%...');
            done(null, 'Success!');
        } catch (error) {
            done(error, error.message);
        }

    }

    @OnQueueActive()
    onActive(job: Job) {
        console.log(`Processing job ${job.id} of type ${job.name}`);
    }

    @OnQueueCompleted()
    onCompleted(job: Job) {
        console.log(`Completed job ${job.id} of type ${job.name}`);
    }

    @OnQueueError()
    onError(job: Job) {
        console.log(`Failed job ${job.id} of type ${job.name}`);
    }

    @OnQueuePaused()
    onPaused(job: Job) {
        console.log(`Job ${job.id} paused`);
    }
}