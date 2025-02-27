export class BackendVastValidator {
  constructor(private url: string) {}

  async validate() {
    console.log("backend validate vast", this.url);
    return true;
  }
}
