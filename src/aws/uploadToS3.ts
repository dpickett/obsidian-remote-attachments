import { Upload } from "@aws-sdk/lib-storage";
import { getS3Client } from "./getS3Client";
import { S3SettingsParams } from "./S3Settings";

export const uploadToS3 = (file: File, fileName: string, settings: S3SettingsParams) => {
  const client = getS3Client(settings);
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
