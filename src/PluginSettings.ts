import { S3SettingDefaults, S3SettingsParams } from "./aws/S3Settings";

export interface PluginSettings {
  remoteAdapter: "aws";
  aws: S3SettingsParams;
}

export const defaultSettings: PluginSettings = {
  remoteAdapter: "aws",
  aws: S3SettingDefaults,
};
