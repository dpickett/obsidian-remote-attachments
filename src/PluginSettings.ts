export interface PluginSettings {
  remoteAdapter: "aws";
  aws: {
    bucketName: string;
    accessKey: string;
    secretAccessKey: string;
    region: string;
  };
}

export const defaultSettings: PluginSettings = {
  remoteAdapter: "aws",
  aws: {
    bucketName: "",
    accessKey: "",
    secretAccessKey: "",
    region: "",
  },
};
