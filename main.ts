import { Editor, MarkdownView, Notice, Plugin } from "obsidian";
import { S3Settings } from "src/aws/S3Settings";
import { FileUpload } from "src/FileUpload";
import { defaultSettings, PluginSettings } from "src/PluginSettings";
import { SettingsTab } from "src/SettingsTab";

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

  onunload() { }

  async loadSettings() {
    this.settings = Object.assign({}, defaultSettings, await this.loadData());
    const s3Settings = new S3Settings(this.settings.aws);
    this.hasValidSettings = s3Settings.isValid();
    const fileEventHandler = this.handleFileEvent.bind(this);
    const handleDropEvent = this.handleDropEvent.bind(this);
    if (s3Settings.isValid()) {
      this.registerEvent(this.app.workspace.on("editor-paste", fileEventHandler));
      this.registerEvent(this.app.workspace.on("editor-drop", handleDropEvent));
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

  private handleDropEvent(event: DragEvent, _: Editor, markdownView: MarkdownView) {
    if (!event.dataTransfer) {
      return;
    }

    if (event.dataTransfer.types.length < 1 || !event.dataTransfer.types.includes("Files")) {
      return;
    }

    const { files } = event.dataTransfer
    if (files.length > 0) {
      event.preventDefault();
      this.uploadFileList(files, markdownView);
    }
  }

  private handleFileEvent(event: ClipboardEvent, _: Editor, markdownView: MarkdownView) {
    const hasFiles = event.clipboardData && event.clipboardData.files.length > 0
    if (hasFiles) {
      event.preventDefault();
      this.uploadFileList(event.clipboardData.files, markdownView)

    }
  }

  private uploadFileList(files: FileList, markdownView: MarkdownView) {
    let insertionPoint = markdownView.editor.getCursor()
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const fileUpload = new FileUpload(file, this.settings);
      fileUpload
        .transmit()
        .then((url) => {
          markdownView.editor.replaceRange(`![](${url})`, insertionPoint);
          insertionPoint = markdownView.editor.getCursor()
        })
        .catch((error: Error) => {
          new Notice(`Failed to upload to S3: ${error.message}`);
          console.error(error);
        });
    }
  }
}
