import RemoteAttachmentPlugin from "main";
import { App, PluginSettingTab, Setting } from "obsidian";

export class SettingsTab extends PluginSettingTab {
  plugin: RemoteAttachmentPlugin;

  constructor(app: App, plugin: RemoteAttachmentPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;

    containerEl.empty();

    containerEl.createEl("h1", { text: "Amazon S3 Settings" });
    containerEl.createEl("p", { text: "Currently, only AWS S3 is supported." });

    new Setting(containerEl)
      .setName("Bucket Name")
      .setDesc("The name of your s3 bucket")
      .addText((text) =>
        text
          .setPlaceholder("Enter your bucket name")
          .setValue(this.plugin.settings.aws.bucketName)
          .onChange(async (value) => {
            this.plugin.settings.aws.bucketName = value;
            await this.plugin.saveSettings();
          }),
      );

    new Setting(containerEl)
      .setName("Region")
      .setDesc("The AWS region where your S3 bucket is located")
      .addText((text) =>
        text
          .setPlaceholder("Enter your region")
          .setValue(this.plugin.settings.aws.region)
          .onChange(async (value) => {
            this.plugin.settings.aws.region = value;
            await this.plugin.saveSettings();
          }),
      );

    new Setting(containerEl)
      .setName("Access Key")
      .setDesc("The access key is provided by Amazon S3")
      .addText((text) =>
        text
          .setPlaceholder("Enter your access key")
          .setValue(this.plugin.settings.aws.accessKey)
          .onChange(async (value) => {
            this.plugin.settings.aws.accessKey = value;
            await this.plugin.saveSettings();
          }),
      );

    new Setting(containerEl)
      .setName("Secret Access Key")
      .setDesc("The secret access key is provided by Amazon S3")
      .addText((text) =>
        text
          .setPlaceholder("Enter your secret access key")
          .setValue(this.plugin.settings.aws.secretAccessKey)
          .onChange(async (value) => {
            this.plugin.settings.aws.secretAccessKey = value;
            await this.plugin.saveSettings();
          }),
      );
  }
}
