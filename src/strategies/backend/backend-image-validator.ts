export class BackendImageValidator {
  async validate(file: Express.Multer.File) {
    console.log("backend validate image", file);
    return true;
  }
}
