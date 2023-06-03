import { basename, extname } from "path";
import { v4 } from "uuid";
export const makeUniqueFileName = (fileName: string) => {
  const uuid = v4();
  const baseName = basename(fileName);
  const extension = extname(fileName);
  return `${baseName}-${uuid}${extension}`;
};
