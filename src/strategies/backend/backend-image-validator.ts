export class BackendImageValidator {
  constructor(private file: Express.Multer.File) {}

  async validate() {
    console.log("backend validate image", this.file);
    return true;
  }
}
