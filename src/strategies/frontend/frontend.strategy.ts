import { ValidatorStrategy } from "../../interfaces/validator.interface";
import { AllowedFileTypes } from "../../types/validator";
import { FrontendImageValidator } from "./frontend-image-validator";
import { FrontendVastValidator } from "./frontend-vast-validator";
import { FrontendVideoValidator } from "./frontend-video-validator";

export class FrontendValidatorStrategy implements ValidatorStrategy {
  async validate(
    type: AllowedFileTypes,
    file?: File | Express.Multer.File | string
  ): Promise<boolean> {
    if ((type === "image" || type === "video") && !this.isFile(file)) {
      throw new Error("Invalid type for frontend validation.");
    }

    if (type === "vast" && !(file instanceof String)) {
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

  private isFile(object: any): object is File {
    return "name" in object && "size" in object && "type" in object;
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
