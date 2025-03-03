import {
  ALLOWED_DURATION_SEC,
  ALLOWED_VIDEO_FORMATS,
  ALLOWED_VIDEO_MIN_BITRATES_BY_RESOLUTION,
  ALLOWED_VIDEO_SIZES_PX,
  MAX_SIZE,
} from "../../constants/video.constants";
import { ValidationErrorCodes } from "../../definitions/validator.enums";
import { ValidationError } from "../../errors/validation-error";
import { BackendMediaAnalyzer } from "../../utils/backend-media-analyzer";
import { normalizeFileType } from "../../utils/utils";

export class BackendVideoValidator {
  async validate(file: Express.Multer.File) {
    const backendMediaAnalyzer = new BackendMediaAnalyzer();
    const videoMetadata = await backendMediaAnalyzer.analyzeMediaBuffer(file);

    const errors = [
      this.validateFormat(videoMetadata.format.split(",")),
      this.validateDuration(videoMetadata.durationInSeconds ?? 0),
      this.validateResolution(videoMetadata.resolution.height),
      this.validateBitRate(
        videoMetadata.bitRate ?? 0,
        videoMetadata.resolution?.height
      ),
    ].filter((e) => e);

    if (errors.length) {
      throw new ValidationError(
        `Invalid Video: ${errors.join(", ")}`,
        ValidationErrorCodes.INVALID_VIDEO
      );
    }

    return false;
  }

  validateFormat(formats: string[]): string | boolean {
    for (const format of formats) {
      if (ALLOWED_VIDEO_FORMATS.includes(normalizeFileType(format))) {
        return false;
      }
    }

    return "Incorrect file format. Use MP4, FLV, or AVI instead.";
  }

  validateSize(size: number): string | boolean {
    if (size > MAX_SIZE) {
      return `Invalid size - Maximum allowed is: ${MAX_SIZE / 1000000} MB.`;
    }
    return false;
  }

  validateDuration(duration: number): string | boolean {
    if (ALLOWED_DURATION_SEC.includes(duration)) {
      return false;
    }

    return `The uploaded video has duration ${duration}sec which is not supported - Please use one of the following durations: 15s, 30s, 60s`;
  }

  validateResolution(height: number): string | boolean {
    if (ALLOWED_VIDEO_SIZES_PX.includes(height ?? 0)) {
      return false;
    }
    return "Resolution not supported - Please use 2160p, 1280p, 1080p, 720p or 432p";
  }

  validateBitRate(bitRate: number, height: number) {
    if (!(height in ALLOWED_VIDEO_MIN_BITRATES_BY_RESOLUTION)) {
      return "Invalid bitrate - Didn't match with resolution.";
    }

    const allowedBitRate =
      ALLOWED_VIDEO_MIN_BITRATES_BY_RESOLUTION[
        height as keyof typeof ALLOWED_VIDEO_MIN_BITRATES_BY_RESOLUTION
      ];

    if (bitRate >= allowedBitRate) {
      return false;
    }

    return `Video has a bitrate of ${bitRate} kbps which is incorrect for ${height}p resolution - Please the following or above: ${allowedBitRate}.
   `;
  }
}
