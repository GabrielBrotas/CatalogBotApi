import AWS from "aws-sdk";
import fs from "fs";
import mime from "mime";
import { resolve } from "path";

import upload from '../../../../../config/upload'

import { IStorageProvider } from "../IStorageProvider";

// config
const credentials = new AWS.SharedIniFileCredentials({ profile: 'wasabi' });
AWS.config.credentials = credentials;
AWS.config.update({
  accessKeyId: process.env.WASABI_KEY,
  secretAccessKey: process.env.WASABI_SECRET_KEY
});
const ep = new AWS.Endpoint('s3.wasabisys.com');

class S3StorageProvider implements IStorageProvider {
  private client;

  constructor() {
    this.client = new AWS.S3({ endpoint: ep })
  }

  async save(file: string, folder: string): Promise<string> {
    const originalName = resolve(upload.tmpFolder, file);

    const fileContent = await fs.promises.readFile(originalName);

    const ContentType = mime.getType(originalName) as string;

    // salvar no bucket
    await this.client
      .putObject({
        Bucket: `${process.env.WASABI_BUCKET}/${folder}`,
        Key: file,
        ACL: "public-read",
        Body: fileContent,
        ContentType,
      })
      .promise();

    // remover do tmp
    await fs.promises.unlink(originalName);

    return file;
  }

  async delete(file: string, folder: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: `${process.env.WASABI_BUCKET}/${folder}`,
        Key: file,
      })
      .promise();
  }
}

export { S3StorageProvider };
