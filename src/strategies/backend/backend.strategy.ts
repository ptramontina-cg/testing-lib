import { BackendValidatorStrategy } from "../../interfaces/validator.interface";
import { AllowedFileTypes } from "../../definitions/validator.types";
import { BackendImageValidator } from "./backend-image-validator";
import { BackendVastValidator } from "./backend-vast-validator";
import { BackendVideoValidator } from "./backend-video-validator";

export class CreativeValidator implements BackendValidatorStrategy {
  async validate(
    type: AllowedFileTypes,
    file: Express.Multer.File | string
  ): Promise<boolean> {
    if (file instanceof String && type !== "vast") {
      throw new Error("Invalid type for backend validation.");
    }

    switch (type) {
      case "image":
        return await this.validateImage(file as Express.Multer.File);
      case "video":
        return await this.validateVideo(file as Express.Multer.File);
      case "vast":
        return await this.validateVast(file as string);
    }
  }

  private async validateVideo(file: Express.Multer.File): Promise<boolean> {
    const backendVideoValidator = new BackendVideoValidator();
    return await backendVideoValidator.validate(file);
  }

  private async validateImage(file: Express.Multer.File): Promise<boolean> {
    const backendImageValidator = new BackendImageValidator();
    return await backendImageValidator.validate(file);
  }

  private async validateVast(url: string): Promise<boolean> {
    const backendVastValidator = new BackendVastValidator();
    return await backendVastValidator.validate(url);
  }
}
