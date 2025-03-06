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
  async validate(file: File) {
    if (!file.type.includes("image/")) {
      throw new ValidationError(
        `Invalid File Input: File is not an image`,
        ValidationErrorCodes.INVALID_INPUT
      );
    }

    const image = await this.getImageFromFile(file);

    const errors = [
      this.validateSize(file.size),
      this.validateResolution(image.width, image.height),
      this.validateType(file.type),
    ].filter((e) => e);

    if (errors.length) {
      throw new ValidationError(
        `Invalid Image: ${errors.join(", ")}`,
        ValidationErrorCodes.INVALID_IMAGE
      );
    }

    return true;
  }

  private validateSize(size: number) {
    if (size > MAX_SIZE) {
      return `Invalid size. Maximum allowed is: ${MAX_SIZE / 1000000} MB.`;
    }
    return false;
  }

  private async validateResolution(width: number, height: number) {
    if (
      width > MAX_WIDTH ||
      width < MIN_WIDTH ||
      height > MAX_HEIGHT ||
      height < MIN_HEIGHT
    ) {
      return `Invalid resolution - Min: ${MIN_WIDTH}x${MIN_HEIGHT} - Max: ${MAX_WIDTH}x${MAX_HEIGHT}`;
    }
    return false;
  }

  private validateType(type: string) {
    if (!ALLOWED_IMAGE_FORMATS.includes(normalizeFileType(type))) {
      return `Invalid format - Only the following are allowed: ${ALLOWED_IMAGE_FORMATS.join(
        ", "
      )}`;
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
