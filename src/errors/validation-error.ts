import { ValidationErrorCodes } from "../definitions/validator.enums";

export class ValidationError extends Error {
  private code: number;

  constructor(message: string, errorCode: ValidationErrorCodes) {
    super(message);
    this.code = errorCode;
    this.name = "ValidationError";
  }

  get errorCode(): ValidationErrorCodes {
    return this.code;
  }
}
