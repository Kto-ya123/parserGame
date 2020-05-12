export class ParsedGame {
  constructor(fileName?: string, fileConent?: string, imageUrl?: string) {
    this.fileContent = fileConent;
    this.fileName = fileName;
    this.imageUrl = imageUrl;
  }

  fileContent: string;
  imageUrl: string;
  fileName: string;
}
