import { Notice, Plugin } from "obsidian";
import { S3Settings } from "src/aws/S3Settings";
import { FileUpload } from "src/FileUpload";
import { defaultSettings, PluginSettings } from "src/PluginSettings";
import { SettingsTab } from "src/SettingsTab";

// Remember to rename these classes and interfaces!

export default class RemoteAttachmentPlugin extends Plugin {
  settings: PluginSettings;
  hasValidSettings: boolean;

  async onload() {
    await this.loadSettings();

    // This adds a settings tab so the user can configure various aspects of the plugin
    this.addSettingTab(new SettingsTab(this.app, this));

    // When registering intervals, this function will automatically clear the interval when the plugin is disabled.
    this.registerInterval(window.setInterval(() => console.log("setInterval"), 5 * 60 * 1000));
  }

  onunload() {}

  async loadSettings() {
    this.settings = Object.assign({}, defaultSettings, await this.loadData());
    const s3Settings = new S3Settings(this.settings.aws);
    this.hasValidSettings = s3Settings.isValid();
    const fileEventHandler = this.handleFileEvent.bind(this);
    if (s3Settings.isValid()) {
      this.registerEvent(this.app.workspace.on("editor-paste", fileEventHandler));
    } else {
      new Notice(
        "Remote Attachments: S3 is not properly configured. Please check your settings to enable S3 uploading",
      );
      this.app.workspace.off("editor-paste", fileEventHandler);
    }
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  private handleFileEvent(event: ClipboardEvent) {
    const file = event.clipboardData?.files[0];
    if (file) {
      event.preventDefault();
      const fileUpload = new FileUpload(file, this.settings);
      fileUpload.transmit();
    }
  }
}
