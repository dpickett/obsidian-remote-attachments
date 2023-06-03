import { S3Settings } from "../aws/S3Settings";

describe("S3 settings", () => {
  const populatedSettings = {
    accessKey: "access",
    bucketName: "bucket",
    region: "region",
    secretAccessKey: "secret",
  };

  it("is valid if all params are specified", () => {
    const settings = new S3Settings(populatedSettings);
    expect(settings.isValid()).toBe(true);
  });
});
