export class FrontendVideoValidator {
  constructor(private file: File) {}

  async validate() {
    console.log(this.file);
    console.log("video is valid in frontend");
    return true;
  }
}
