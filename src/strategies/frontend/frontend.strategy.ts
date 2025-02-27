import { FrontendValidatorStrategy } from "../../interfaces/validator.interface";
import { AllowedFileTypes } from "../../types/validator";
import { FrontendImageValidator } from "./frontend-image-validator";
import { FrontendVastValidator } from "./frontend-vast-validator";
import { FrontendVideoValidator } from "./frontend-video-validator";

export class CreativeValidator implements FrontendValidatorStrategy {
  async validate(
    type: AllowedFileTypes,
    file: File | string
  ): Promise<boolean> {
    if (file instanceof String && type !== "vast") {
      throw new Error("Invalid type for frontend validation.");
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
    const frontendVideoValidator = new FrontendVideoValidator(file);
    return await frontendVideoValidator.validate();
  }

  private async validateImage(file: File): Promise<boolean> {
    const frontendImageValidator = new FrontendImageValidator(file);
    return await frontendImageValidator.validate();
  }

  private async validateVast(url: string): Promise<boolean> {
    const frontendVastValidator = new FrontendVastValidator(url);
    return await frontendVastValidator.validate();
  }
}
