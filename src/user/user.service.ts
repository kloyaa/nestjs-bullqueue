import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { UploadImageContent } from 'src/__common/interfaces/interface';

@Injectable()
export class UserService {
  constructor(@InjectQueue('imageUpload') private readonly imageUpload: Queue) {}
  async uploadFile(file) {
    const { originalname } = file;

    const content: UploadImageContent = {
      file: file.buffer,
      name: originalname,
      bucket: process.env.S3_BUCKET,
      mimetype: file.mimetype,
    }

    await this.imageUpload.add('upload-image', content, {
      delay: 3000,
      preventParsingData: true,
      attempts: 5,
      backoff: {
        type: 'exponential',
        delay: 3000,
      },
    });

    return { message: "Success!" }
  }
}
