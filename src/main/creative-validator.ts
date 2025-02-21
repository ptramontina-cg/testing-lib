import { ValidatorStrategy } from "../interfaces/validator.interface";
import { BackendValidatorStrategy } from "../strategies/backend.strategy";
import { FrontendValidatorStrategy } from "../strategies/frontend.strategy";
import { AllowedValitators } from "../types/validator";

export class CreativeValidator {
  private validatorStrategy: ValidatorStrategy;

  constructor(validationType: AllowedValitators) {
    this.validatorStrategy =
      validationType === "backend"
        ? new BackendValidatorStrategy()
        : new FrontendValidatorStrategy();
  }

  validate(file: File) {
    this.validatorStrategy.validate(file);
  }
}
