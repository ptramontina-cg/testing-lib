import {
  ALLOWED_IMAGE_FORMATS,
  MAX_HEIGHT,
  MAX_SIZE,
  MAX_WIDTH,
  MIN_HEIGHT,
  MIN_WIDTH,
} from "../../constants/image.constants";
import { normalizeFileType } from "../../utils/utils";

export class FrontendImageValidator {
  constructor(private file: File) {}

  async validate() {
    console.log("frontend validate image", this.file);

    // console.log(this.file);

    // const img = await this.getImageFromFile(this.file);
    // console.log(img.width, img.height);

    return true;
  }

  private validateSize() {
    return this.file.size > MAX_SIZE;
  }

  private async validateResolution() {
    const image = await this.getImageFromFile(this.file);
    return (
      image.width > MAX_WIDTH ||
      image.width < MIN_WIDTH ||
      image.height > MAX_HEIGHT ||
      image.height < MIN_HEIGHT
    );
  }

  private validateType() {
    return ALLOWED_IMAGE_FORMATS.includes(normalizeFileType(this.file.type));
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
