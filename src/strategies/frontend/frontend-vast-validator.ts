export class FrontendVastValidator {
  constructor(private file: string) {}

  async validate() {
    console.log(this.file);
    return true;
  }
}
