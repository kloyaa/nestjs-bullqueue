export interface UploadImageContent {
    file: Buffer;
    name: string;
    bucket: string;
    mimetype: string;
  }