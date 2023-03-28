import { getSignedUrl } from "./aws/getSignedUrl";
import { uploadToS3 } from "./aws/uploadToS3";
import { makeUniqueFileName } from "./makeUniqueFileName";
import { PluginSettings } from "./PluginSettings";
import { UploadFailedError } from "./UploadFailedError";

const signatureExpirationTtlSeconds = 60;
export class FileUpload {
  private file: File;
  private settings: PluginSettings;

  constructor(file: File, settings: PluginSettings) {
    this.file = file;
    this.settings = settings;
  }

  async transmit() {
    const fileName = makeUniqueFileName(this.file.name);
    return await uploadToS3(this.file, fileName, this.settings.aws)
      .then(() => {
        return getSignedUrl({
          key: fileName,
          settings: this.settings.aws,
          ttlSeconds: signatureExpirationTtlSeconds,
        });
      })
      .catch((error: Error) => {
        throw new UploadFailedError(error.message);
      });
  }
}
