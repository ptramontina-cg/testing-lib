import { FrontendValidatorStrategy } from "../../interfaces/validator.interface";
import { AllowedFileTypes } from "../../definitions/validator.types";
import { FrontendImageValidator } from "./frontend-image-validator";
import { FrontendVastValidator } from "./frontend-vast-validator";
import { FrontendVideoValidator } from "./frontend-video-validator";
import { ValidationError } from "../../errors/validation-error";
import { ValidationErrorCodes } from "../../definitions/validator.enums";

export class CreativeValidator implements FrontendValidatorStrategy {
  async validate(
    type: AllowedFileTypes,
    file: File | string
  ): Promise<boolean> {
    if (file instanceof String && type !== "vast") {
      throw new ValidationError(
        `Invalid File Input: String is only allowed for VAST.`,
        ValidationErrorCodes.INVALID_INPUT
      );
    }

    switch (type) {
      case "image":
        return await this.validateImage(file as File);
      case "video":
        return await this.validateVideo(file as File);
      case "vast":
        return await this.validateVast(file as string);
    }
  }

  private async validateVideo(file: File): Promise<boolean> {
    const frontendVideoValidator = new FrontendVideoValidator();
    return await frontendVideoValidator.validate(file);
  }

  private async validateImage(file: File): Promise<boolean> {
    const frontendImageValidator = new FrontendImageValidator();
    return await frontendImageValidator.validate(file);
  }

  private async validateVast(url: string): Promise<boolean> {
    const frontendVastValidator = new FrontendVastValidator();
    return await frontendVastValidator.validate(url);
  }
}
