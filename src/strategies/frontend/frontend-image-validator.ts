import {
  ALLOWED_IMAGE_FORMATS,
  MAX_HEIGHT,
  MAX_SIZE,
  MAX_WIDTH,
  MIN_HEIGHT,
  MIN_WIDTH,
} from "../../constants/image.constants";
import { ValidationErrorCodes } from "../../definitions/validator.enums";
import { ValidationError } from "../../errors/validation-error";
import { normalizeFileType } from "../../utils/utils";

export class FrontendImageValidator {
  constructor(private file: File) {}

  async validate() {
    if (!this.file.type.includes("image/")) {
      throw new ValidationError(
        `Invalid File Input: File is not an image`,
        ValidationErrorCodes.INVALID_INPUT
      );
    }

    const errors = [
      this.validateSize(),
      await this.validateResolution(),
      this.validateType(),
    ].filter((e) => e);

    if (errors.length) {
      throw new ValidationError(
        `Invalid Image: ${errors.join(",")}`,
        ValidationErrorCodes.INVALID_IMAGE
      );
    }

    return true;
  }

  private validateSize() {
    if (this.file.size > MAX_SIZE) {
      return `Invalid size. Maximum allowed is: ${MAX_SIZE / 1000000} MB.`;
    }
    return false;
  }

  private async validateResolution() {
    const image = await this.getImageFromFile(this.file);
    if (
      image.width > MAX_WIDTH ||
      image.width < MIN_WIDTH ||
      image.height > MAX_HEIGHT ||
      image.height < MIN_HEIGHT
    ) {
      return `Invalid resolution. Min: ${MIN_WIDTH}x${MIN_HEIGHT}. Max: ${MAX_WIDTH}x${MAX_HEIGHT}.`;
    }
    return false;
  }

  private validateType() {
    if (!ALLOWED_IMAGE_FORMATS.includes(normalizeFileType(this.file.type))) {
      return `Invalid format. Only the following are allowed: ${ALLOWED_IMAGE_FORMATS.join(
        ", "
      )}.`;
    }
    return false;
  }

  private async getImageFromFile(file: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      file.arrayBuffer().then((arrayB) => {
        const blob = new Blob([arrayB], { type: file.type });
        const url = URL.createObjectURL(blob);

        const img = new Image();
        img.src = url;

        img.onload = () => resolve(img);
        img.onerror = reject;
      });
    });
  }
}
