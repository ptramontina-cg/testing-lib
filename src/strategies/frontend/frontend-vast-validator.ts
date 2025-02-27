export class FrontendVastValidator {
  constructor(private file: string) {}

  async validate() {
    console.log("frontend validate vast", this.file);
    return true;
  }
}
