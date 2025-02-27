import { AllowedFileTypes } from "../definitions/validator.types";

export interface BackendValidatorStrategy {
  validate(
    type: AllowedFileTypes,
    file: Express.Multer.File | string
  ): Promise<boolean>;
}

export interface FrontendValidatorStrategy {
  validate(type: AllowedFileTypes, file: File | string): Promise<boolean>;
}
