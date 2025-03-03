import {
  ALLOWED_IMAGE_FORMATS,
  MAX_HEIGHT,
  MAX_SIZE,
  MAX_WIDTH,
  MIN_HEIGHT,
  MIN_WIDTH,
} from "../../constants/image.constants";
import { ValidationErrorCodes } from "../../definitions/validator.enums";
import { VideoOrImageMetadata } from "../../definitions/validator.interfaces";
import { ValidationError } from "../../errors/validation-error";
import { BackendMediaAnalyzer } from "../../utils/backend-media-analyzer";

export class BackendImageValidator {
  async validate(file: Express.Multer.File) {
    const imageMetadata = await this.getImageMetadata(file);

    const errors = [
      this.validateResolution(
        imageMetadata.resolution.height,
        imageMetadata.resolution.width
      ),
      this.validateSize(file.size),
      this.validateFormat(file.mimetype),
    ].filter((e) => e);

    if (errors.length) {
      throw new ValidationError(
        `Invalid Image: ${errors.join(", ")}`,
        ValidationErrorCodes.INVALID_IMAGE
      );
    }

    return true;
  }

  validateResolution(height: number, width: number): string | boolean {
    if (
      width > MAX_WIDTH ||
      width < MIN_WIDTH ||
      height > MAX_HEIGHT ||
      height < MIN_HEIGHT
    ) {
      return `Invalid resolution. Min: ${MIN_WIDTH}x${MIN_HEIGHT}. Max: ${MAX_WIDTH}x${MAX_HEIGHT}.`;
    }
    return false;
  }

  validateSize(size: number): string | boolean {
    if (size > MAX_SIZE) {
      return `Invalid size. Maximum allowed is: ${MAX_SIZE / 1000000} MB.`;
    }
    return false;
  }

  validateFormat(format: string): string | boolean {
    if (!ALLOWED_IMAGE_FORMATS.includes(format)) {
      return `Invalid format. Only the following are allowed: ${ALLOWED_IMAGE_FORMATS.join(
        ", "
      )}.`;
    }
    return false;
  }

  async getImageMetadata(
    file: Express.Multer.File
  ): Promise<VideoOrImageMetadata> {
    const analizer = new BackendMediaAnalyzer();
    return await analizer.analyzeMediaBuffer(file);
  }
}
