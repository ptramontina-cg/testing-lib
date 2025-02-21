import { ValidatorStrategy } from "../interfaces/validator.interface";

export class FrontendValidatorStrategy implements ValidatorStrategy {
  async validate(file?: File): Promise<boolean> {
    console.log("FrontendValidatorStrategy", file);
    return true;
  }
}
