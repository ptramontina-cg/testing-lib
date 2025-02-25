export class BackendImageValidator {
  constructor(private file: Express.Multer.File) {}

  async validate() {
    console.log(this.file);
    return true;
  }
}
