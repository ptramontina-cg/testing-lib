import axios from "axios";
import { ValidationError } from "../../errors/validation-error";
import { ValidationErrorCodes } from "../../definitions/validator.enums";

export class FrontendVastValidator {
  async validate(url: string) {
    this.validateUrl(url);
    await this.validateXml(url);

    return true;
  }

  private validateUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch (err) {
      throw new ValidationError(
        `Invalid Vast: Current input is not an url`,
        ValidationErrorCodes.INVALID_VAST
      );
    }
  }

  private async validateXml(url: string): Promise<boolean> {
    const result = await axios.get(url);

    if (!result.data.includes("<?xml")) {
      throw new ValidationError(
        `Invalid Vast: Return from url is not XML`,
        ValidationErrorCodes.INVALID_VAST
      );
    }

    return true;
  }
}
