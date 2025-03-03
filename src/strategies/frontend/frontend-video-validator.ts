import {
  ALLOWED_DURATION_SEC,
  ALLOWED_HOSTED_VIDEO_MIN_BITRATES_BY_RESOLUTION,
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

    const v = await this.getVideoFromFile(file);

    console.log(v.duration); // seconds
    console.log(v.duration / 60); // minutes
    console.log("h", v.videoHeight, "x", "w", v.videoWidth);
    console.log(file.size); // bytes
    console.log(file.size / 1000); // kbytes

    console.log("bitrate", file.size / 1000000 / (v.duration * 0.0075));

    // let errors = [this.validateSize(file.size)];

    // if (this.isVideoSupported()) {
    //   const video = await this.getVideoFromFile(file);

    //   errors.push(
    //     this.validateBitRate(),
    //     this.validateResolution(video),
    //     this.validateDuration(video)
    //   );
    // }

    // errors = errors.filter((e) => e);

    // if (errors.length) {
    //   throw new ValidationError(
    //     `Invalid Video: ${errors.join(", ")}`,
    //     ValidationErrorCodes.INVALID_VIDEO
    //   );
    // }

    return true;
  }

  private validateSize(video: File): boolean | string {
    if (video.size > MAX_SIZE) {
      return `Invalid size. Maximum allowed is: ${MAX_SIZE / 1000000} MB.`;
    }
    return false;
  }

  private validateBitRate() {
    console.log();
  }

  private validateResolution(video: HTMLVideoElement) {
    const resolution = this.heightToResolution(video.videoHeight);
    if (resolution in ALLOWED_HOSTED_VIDEO_MIN_BITRATES_BY_RESOLUTION) {
      return "Resolution not supported. Please use 2160p, 1280p, 1080p, 720p or 432p.";
    }
    return false;
  }

  private validateDuration(video: HTMLVideoElement) {
    return Math.round(video.duration) + "" in ALLOWED_DURATION_SEC;
  }

  /**
   * Only a few video types are supported by HTMLVideoElement.
   * If the video is not of this type, everything but the size is validated.
   * Everything else should be validated by the backend.
   */
  private isVideoSupported(video: File) {
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

  private heightToResolution(height: number): number {
    return height;
  }
}
