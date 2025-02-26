import { ValidatorStrategy } from "../interfaces/validator.interface";
import { BackendValidatorStrategy } from "../strategies/backend/backend.strategy";
import { FrontendValidatorStrategy } from "../strategies/frontend/frontend.strategy";
import { AllowedFileTypes, AllowedValitators } from "../types/validator";

export class CreativeValidator {
  private validatorStrategy: ValidatorStrategy;

  constructor(validationType: AllowedValitators) {
    // this.validatorStrategy =
    //   validationType === "backend"
    //     ? new BackendValidatorStrategy()
    //     : new FrontendValidatorStrategy();

    if (typeof window === "undefined") {
      this.validatorStrategy = new BackendValidatorStrategy();
    } else {
      this.validatorStrategy = new FrontendValidatorStrategy();
    }
  }

  async validate(
    type: AllowedFileTypes,
    file: File | Express.Multer.File | string
  ) {
    return await this.validatorStrategy.validate(type, file);
  }
}
