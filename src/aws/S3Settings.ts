export interface S3SettingsParams {
  accessKey: string;
  bucketName: string;
  region: string;
  secretAccessKey: string;
}
export class S3Settings implements S3SettingsParams {
  accessKey: string;
  bucketName: string;
  region: string;
  secretAccessKey: string;

  constructor(s3Settings: S3SettingsParams) {
    this.accessKey = s3Settings.accessKey;
    this.bucketName = s3Settings.bucketName;
    this.region = s3Settings.region;
    this.secretAccessKey = s3Settings.secretAccessKey;
  }

  isValid() {
    return [this.accessKey, this.bucketName, this.region, this.secretAccessKey].every(
      (setting) => ![undefined, null, ""].includes(setting),
    );
  }
}

export const S3SettingDefaults = {
  accessKey: "",
  bucketName: "",
  region: "",
  secretAccessKey: "",
};
