import { S3 } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { S3SettingsParams } from "./S3Settings";

export const uploadToS3 = (file: File, fileName: string, settings: S3SettingsParams) => {
  const client = new S3({
    region: settings.region,
    credentials: {
      accessKeyId: settings.accessKey,
      secretAccessKey: settings.secretAccessKey,
    },
  });
  const stream = file.stream();

  const upload = new Upload({
    client,
    params: {
      Bucket: settings.bucketName,
      Key: fileName,
      Body: stream,
    },
  });

  return upload.done();
};
