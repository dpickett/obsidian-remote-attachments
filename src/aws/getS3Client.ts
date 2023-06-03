import { S3 } from "@aws-sdk/client-s3";
import { S3SettingsParams } from "./S3Settings";

export const getS3Client = (settings: S3SettingsParams) => {
  return new S3({
    region: settings.region,
    credentials: {
      accessKeyId: settings.accessKey,
      secretAccessKey: settings.secretAccessKey,
    },
  });
};
