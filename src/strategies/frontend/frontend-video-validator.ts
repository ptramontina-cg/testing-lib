export class FrontendVideoValidator {
  constructor(private file: File) {}

  async validate() {
    console.log(this.file);
    return true;
  }
}
