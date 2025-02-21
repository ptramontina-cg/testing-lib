import { ValidatorStrategy } from "../interfaces/validator.interface";

export class BackendValidatorStrategy implements ValidatorStrategy {
  async validate(file: File): Promise<boolean> {
    console.log("Backend", file);
    return true;
  }
}
