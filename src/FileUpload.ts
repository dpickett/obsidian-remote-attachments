import { uploadToS3 } from "./aws/uploadToS3";
import { makeUniqueFileName } from "./makeUniqueFileName";
import { PluginSettings } from "./PluginSettings";
import { UploadFailedError } from "./UploadFailedError";

export class FileUpload {
  private file: File;
  private settings: PluginSettings;

  constructor(file: File, settings: PluginSettings) {
    this.file = file;
    this.settings = settings;
  }

  async transmit() {
    await uploadToS3(this.file, makeUniqueFileName(this.file.name), this.settings.aws)
      .then((value) => {})
      .catch((error: Error) => {
        throw new UploadFailedError(error.message);
      });
  }
}
