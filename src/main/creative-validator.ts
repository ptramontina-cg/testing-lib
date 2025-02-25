import { ValidatorStrategy } from "../interfaces/validator.interface";
import { BackendValidatorStrategy } from "../strategies/backend/backend.strategy";
import { FrontendValidatorStrategy } from "../strategies/frontend/frontend.strategy";
import { AllowedFileTypes, AllowedValitators } from "../types/validator";

export class CreativeValidator {
  private validatorStrategy: ValidatorStrategy;

  constructor(validationType: AllowedValitators) {
    this.validatorStrategy =
      validationType === "backend"
        ? new BackendValidatorStrategy()
        : new FrontendValidatorStrategy();
  }

  validate(type: AllowedFileTypes, file: File | Express.Multer.File | string) {
    this.validatorStrategy.validate(type, file);
  }
}
