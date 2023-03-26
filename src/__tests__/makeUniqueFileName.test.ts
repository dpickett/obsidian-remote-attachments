import { makeUniqueFileName } from "../makeUniqueFileName";

describe("making a unique file name", () => {
  const baseName = "three-bears";
  const extension = ".jpg";
  it("starts with the base name", () => {
    const newName = makeUniqueFileName(`${baseName}${extension}`);
    expect(newName).toMatch(new RegExp(`^${baseName}`));
  });
  it("ends with the extension", () => {
    const newName = makeUniqueFileName(`${baseName}${extension}`);
    expect(newName).toMatch(new RegExp(`${extension}$`));
  });
});
