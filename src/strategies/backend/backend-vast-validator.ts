import * as xml2js from "xml2js";
import axios from "axios";
import { ValidationError } from "../../errors/validation-error";
import { ValidationErrorCodes } from "../../definitions/validator.enums";

export class BackendVastValidator {
  async validate(url: string) {
    const xmlContent = await this.downloadFileFromUrl(url);

    const error = this.validateXml(await this.parseXml(xmlContent));

    if (error) {
      throw new ValidationError(
        "VAST is not valid: " + error,
        ValidationErrorCodes.INVALID_VAST
      );
    }

    return true;
  }

  validateXml(parsedXml: any): string | boolean {
    if (!parsedXml.VAST) {
      return "XML is missing mandatory element - VAST";
    }

    const ads = parsedXml.VAST?.Ad || [];
    if (!ads.length) {
      return "XML is missing mandatory element - Ad";
    }

    for (const ad of ads) {
      if (!ad.InLine && !ad.Wrapper) {
        return "XML is missing mandatory element - Inline or wrapper";
      }
    }

    return false;
  }

  async parseXml(xmlString: string) {
    const parsedXml = await xml2js.parseStringPromise(xmlString);
    if (!parsedXml) {
      throw new ValidationError(
        "VAST is not valid: XML Structure Could not be parsed",
        ValidationErrorCodes.INVALID_VAST
      );
    }
    return parsedXml;
  }

  async downloadFileFromUrl(url: string): Promise<string> {
    try {
      const response = await axios.get(url);
      const contentType = response?.headers?.["content-type"];

      if (!contentType.includes("xml")) {
        throw new Error("The provided URL does not return a valid file type.");
      }

      return response.data;
    } catch (error) {
      throw new ValidationError(
        `VAST is not valid: ${
          error ?? "Failed to download the file from the provided URL."
        }`,
        ValidationErrorCodes.INVALID_INPUT
      );
    }
  }
}
