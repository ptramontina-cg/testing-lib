export class FrontendVideoValidator {
  constructor(private file: File) {}

  async validate() {
    console.log("frontend validate video", this.file);
    return true;
  }
}
