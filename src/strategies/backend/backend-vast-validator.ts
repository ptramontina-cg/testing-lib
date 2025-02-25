export class BackendVastValidator {
  constructor(private url: string) {}

  async validate() {
    console.log(this.url);
    return true;
  }
}
