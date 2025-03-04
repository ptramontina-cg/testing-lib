import {
  ALLOWED_DURATION_SEC,
  ALLOWED_VIDEO_MIN_BITRATES_BY_RESOLUTION,
  FRONTEND_SUPPORTED_FILE_EXTENSIONS,
  MAX_SIZE,
} from "../../constants/video.constants";
import { ValidationErrorCodes } from "../../definitions/validator.enums";
import { ValidationError } from "../../errors/validation-error";
import { normalizeFileType } from "../../utils/utils";

export class FrontendVideoValidator {
  async validate(file: File) {
    if (!file.type.includes("video/")) {
      throw new ValidationError(
        `Invalid File Input: File is not a video`,
        ValidationErrorCodes.INVALID_INPUT
      );
    }

    const video = await this.getVideoFromFile(file);

    let errors = [this.validateSize(file)];

    if (this.isVideoSupported(file)) {
      const video = await this.getVideoFromFile(file);

      errors.push(
        this.validateBitRate(file.size, video.duration, video.videoHeight),
        this.validateResolution(video.height),
        this.validateDuration(video.duration)
      );
    }

    errors = errors.filter((e) => e);

    if (errors.length) {
      throw new ValidationError(
        `Invalid Video: ${errors.join(", ")}`,
        ValidationErrorCodes.INVALID_VIDEO
      );
    }

    return true;
  }

  private validateSize(video: File): boolean | string {
    if (video.size > MAX_SIZE) {
      return `Invalid size - Maximum allowed is: ${MAX_SIZE / 1000000} MB.`;
    }
    return false;
  }

  private validateBitRate(
    size: number,
    duration: number,
    height: number
  ): string | boolean {
    if (!(height in ALLOWED_VIDEO_MIN_BITRATES_BY_RESOLUTION)) {
      return "Invalid bitrate - Didn't match with resolution.";
    }

    duration = Math.round(duration);
    const sizeInBits = size * 8;
    const sizeInKbits = sizeInBits / 1000;

    const avgBitRate = Math.round(sizeInKbits / duration);

    const allowedBitRate =
      ALLOWED_VIDEO_MIN_BITRATES_BY_RESOLUTION[
        height as keyof typeof ALLOWED_VIDEO_MIN_BITRATES_BY_RESOLUTION
      ];

    if (avgBitRate >= allowedBitRate) {
      return false;
    }

    return `Video has a bitrate of ${avgBitRate} kbps which is incorrect for ${height}p resolution - Please the following or above: ${allowedBitRate}`;
  }

  private validateResolution(height: number): string | boolean {
    if (height in ALLOWED_VIDEO_MIN_BITRATES_BY_RESOLUTION) {
      return "Resolution not supported - Please use 2160p, 1280p, 1080p, 720p or 432p.";
    }
    return false;
  }

  private validateDuration(duration: number): string | boolean {
    duration = Math.round(duration);
    if (!ALLOWED_DURATION_SEC.includes(duration)) {
      return `The uploaded video has duration ${duration}sec which is not supported - Please use one of the following durations: 15s, 30s, 60s`;
    }
    return false;
  }

  /**
   * Only a few video types are supported by HTMLVideoElement.
   * If the video is not of this type, everything but the size is validated.
   * Everything else should be validated by the backend.
   */
  private isVideoSupported(video: File): boolean {
    return FRONTEND_SUPPORTED_FILE_EXTENSIONS.includes(
      normalizeFileType(video.type)
    );
  }

  private async getVideoFromFile(file: File): Promise<HTMLVideoElement> {
    return new Promise((resolve, reject) => {
      file.arrayBuffer().then((arrayB) => {
        const blob = new Blob([arrayB]);
        const url = URL.createObjectURL(blob);

        let video = document.createElement("video");

        video.onloadedmetadata = () => resolve(video);
        video.src = url;
      });
    });
  }
}
