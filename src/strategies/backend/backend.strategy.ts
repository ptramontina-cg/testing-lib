import { ValidatorStrategy } from "../../interfaces/validator.interface";
import { AllowedFileTypes } from "../../types/validator";
import { BackendImageValidator } from "./backend-image-validator";
import { BackendVastValidator } from "./backend-vast-validator";
import { BackendVideoValidator } from "./backend-video-validator";

export class BackendValidatorStrategy implements ValidatorStrategy {
  async validate(
    type: AllowedFileTypes,
    file?: File | Express.Multer.File | string
  ): Promise<boolean> {
    if ((type === "image" || type === "video") && !this.isMulterFile(file)) {
      throw new Error("Invalid type for backend validation.");
    }

    if (type === "vast" && !(file instanceof String)) {
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

  private isMulterFile(object: any): object is Express.Multer.File {
    return (
      "buffer" in object &&
      "originalname" in object &&
      "mimetype" in object &&
      "size" in object
    );
  }

  private async validateVideo(file: Express.Multer.File): Promise<boolean> {
    const backendVideoValidator = new BackendVideoValidator(file);
    return await backendVideoValidator.validate();
  }

  private async validateImage(file: Express.Multer.File): Promise<boolean> {
    const backendImageValidator = new BackendImageValidator(file);
    return await backendImageValidator.validate();
  }

  private async validateVast(url: string): Promise<boolean> {
    const backendVastValidator = new BackendVastValidator(url);
    return await backendVastValidator.validate();
  }
}
