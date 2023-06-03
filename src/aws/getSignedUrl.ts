import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { S3SettingsParams } from "./S3Settings";
import { getSignedUrl as s3GetSignedUrl } from "@aws-sdk/s3-request-presigner";

export const getSignedUrl = ({
  key,
  ttlSeconds,
  settings,
}: {
  key: string;
  ttlSeconds: number;
  settings: S3SettingsParams;
}) => {
  const client = new S3Client({
    region: settings.region,
    credentials: {
      accessKeyId: settings.accessKey,
      secretAccessKey: settings.secretAccessKey,
    },
  });
  const command = new GetObjectCommand({
    Bucket: settings.bucketName,
    Key: key,
  });
  return s3GetSignedUrl(client, command, { expiresIn: ttlSeconds });
};
