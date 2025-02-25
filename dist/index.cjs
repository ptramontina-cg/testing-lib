"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  CreativeValidator: () => CreativeValidator
});
module.exports = __toCommonJS(index_exports);

// src/strategies/backend/backend-image-validator.ts
var BackendImageValidator = class {
  constructor(file) {
    this.file = file;
  }
  async validate() {
    console.log(this.file);
    return true;
  }
};

// src/strategies/backend/backend-vast-validator.ts
var BackendVastValidator = class {
  constructor(url) {
    this.url = url;
  }
  async validate() {
    console.log(this.url);
    return true;
  }
};

// src/utils/backend-video-analyser.ts
var import_fluent_ffmpeg = __toESM(require("fluent-ffmpeg"), 1);
var import_stream_buffers = __toESM(require("stream-buffers"), 1);
var import_promises = __toESM(require("fs/promises"), 1);
var import_path = __toESM(require("path"), 1);
var BackendVideoAnalyser = class {
  constructor() {
    if (process.platform === "win32") {
      import_fluent_ffmpeg.default.setFfmpegPath("C:/ffmpeg-master-latest-win64-gpl/bin/ffmpeg.exe");
      import_fluent_ffmpeg.default.setFfprobePath(
        "C:/ffmpeg-master-latest-win64-gpl/bin/ffprobe.exe"
      );
    }
  }
  getResolutionQuality(width, height) {
    if (width >= 3840 && height >= 2160) return "4K";
    if (width >= 2048 && height >= 1080) return "2K";
    if (width >= 1920 && height >= 1080) return "Full HD";
    if (width >= 1280 && height >= 720) return "HD";
    return "SD";
  }
  test() {
    console.log("test from here");
    console.log(import_promises.default);
  }
  /**
   * Generates a screenshot from the middle of a video.
   * @param {Object} file - Express file object containing video data.
   * @returns {Promise<Buffer>} - A buffer of the generated screenshot.
   */
  async generateThumbnail(file) {
    const tempDir = import_path.default.join(__dirname, "tmp");
    const tempInputPath = import_path.default.join(tempDir, `temp_${Date.now()}`);
    const tempOutputPath = import_path.default.join(tempDir, `screenshot_${Date.now()}.png`);
    await import_promises.default.mkdir(tempDir, { recursive: true });
    await import_promises.default.writeFile(tempInputPath, file.buffer);
    return new Promise((resolve, reject) => {
      (0, import_fluent_ffmpeg.default)(tempInputPath).on("error", async (err) => {
        console.error("Error generating screenshot:", err);
        reject(err);
      }).on("end", async () => {
        try {
          const screenshotBuffer = await import_promises.default.readFile(tempOutputPath);
          await import_promises.default.unlink(tempInputPath).catch(() => {
          });
          await import_promises.default.unlink(tempOutputPath).catch(() => {
          });
          resolve(screenshotBuffer);
        } catch (readError) {
          reject(readError);
        }
      }).screenshots({
        timestamps: ["50%"],
        filename: import_path.default.basename(tempOutputPath),
        folder: tempDir
      });
    });
  }
  async analyzeMediaBuffer(file) {
    return new Promise((resolve, reject) => {
      const readableStreamBuffer = new import_stream_buffers.default.ReadableStreamBuffer({
        frequency: 10,
        chunkSize: 2048
      });
      readableStreamBuffer.put(file.buffer);
      readableStreamBuffer.stop();
      (0, import_fluent_ffmpeg.default)(readableStreamBuffer).ffprobe(async (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        const videoOrImageStream = data.streams.find(
          (stream) => stream.codec_type === "video" || stream.codec_type === "image"
        );
        if (!videoOrImageStream) {
          reject(new Error("No video or image stream found"));
          return;
        }
        const result = {
          type: videoOrImageStream.codec_type + "",
          resolution: {
            width: videoOrImageStream.width,
            height: videoOrImageStream.height
          },
          format: data.format.format_name + ""
        };
        if (file.mimetype.startsWith("video")) {
          result.durationInSeconds = videoOrImageStream.duration ? Math.floor(parseFloat(videoOrImageStream.duration)) : void 0;
          result.bitRate = Math.floor(
            parseInt(videoOrImageStream.bit_rate + "") / 1024
          );
          result.resolution.quality = this.getResolutionQuality(
            parseInt(videoOrImageStream.width + ""),
            parseInt(videoOrImageStream.height + "")
          );
          const thumbnailBuffer = await this.generateThumbnail(file);
          result.thumbnail = thumbnailBuffer;
        }
        resolve(result);
      });
    });
  }
};

// src/strategies/backend/backend-video-validator.ts
var BackendVideoValidator = class {
  constructor(file) {
    this.file = file;
  }
  async validate() {
    const backendVideoAnalyser = new BackendVideoAnalyser();
    backendVideoAnalyser.test();
    return true;
  }
};

// src/strategies/backend/backend.strategy.ts
var BackendValidatorStrategy = class {
  async validate(type, file) {
    if ((type === "image" || type === "video") && !this.isMulterFile(file)) {
      throw new Error("Invalid type for backend validation.");
    }
    if (type === "vast" && !(file instanceof String)) {
      throw new Error("Invalid type for backend validation.");
    }
    switch (type) {
      case "image":
        return await this.validateImage(file);
      case "video":
        return await this.validateVideo(file);
      case "vast":
        return await this.validateVast(file);
    }
  }
  isMulterFile(object) {
    return "buffer" in object && "originalname" in object && "mimetype" in object && "size" in object;
  }
  async validateVideo(file) {
    const backendVideoValidator = new BackendVideoValidator(file);
    return await backendVideoValidator.validate();
  }
  async validateImage(file) {
    const backendImageValidator = new BackendImageValidator(file);
    return await backendImageValidator.validate();
  }
  async validateVast(url) {
    const backendVastValidator = new BackendVastValidator(url);
    return await backendVastValidator.validate();
  }
};

// src/constants/image.constants.ts
var MIN_HEIGHT = 50;
var MAX_HEIGHT = 2e3;
var MIN_WIDTH = 50;
var MAX_WIDTH = 2e3;
var ALLOWED_IMAGE_FORMATS = ["JPEG", "JPG", "PNG", "GIF"];
var MAX_SIZE = 1e8;

// src/utils/utils.ts
function normalizeFileType(type) {
  return (type.includes("/") ? type.split("/")[1] : type).toUpperCase();
}

// src/strategies/frontend/frontend-image-validator.ts
var FrontendImageValidator = class {
  constructor(file) {
    this.file = file;
  }
  async validate() {
    console.log(this.file);
    const img = await this.getImageFromFile(this.file);
    console.log(img.width, img.height);
    return true;
  }
  validateSize() {
    return this.file.size > MAX_SIZE;
  }
  async validateResolution() {
    const image = await this.getImageFromFile(this.file);
    return image.width > MAX_WIDTH || image.width < MIN_WIDTH || image.height > MAX_HEIGHT || image.height < MIN_HEIGHT;
  }
  validateType() {
    return ALLOWED_IMAGE_FORMATS.includes(normalizeFileType(this.file.type));
  }
  async getImageFromFile(file) {
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
};

// src/strategies/frontend/frontend-vast-validator.ts
var FrontendVastValidator = class {
  constructor(file) {
    this.file = file;
  }
  async validate() {
    console.log(this.file);
    return true;
  }
};

// src/strategies/frontend/frontend-video-validator.ts
var FrontendVideoValidator = class {
  constructor(file) {
    this.file = file;
  }
  async validate() {
    console.log(this.file);
    return true;
  }
};

// src/strategies/frontend/frontend.strategy.ts
var FrontendValidatorStrategy = class {
  async validate(type, file) {
    if ((type === "image" || type === "video") && !this.isFile(file)) {
      throw new Error("Invalid type for backend validation.");
    }
    if (type === "vast" && !(file instanceof String)) {
      throw new Error("Invalid type for backend validation.");
    }
    switch (type) {
      case "image":
        return await this.validateImage(file);
      case "video":
        return await this.validateVideo(file);
      case "vast":
        return await this.validateVast(file);
    }
  }
  isFile(object) {
    return "fileBits" in object && "fileName" in object && "options" in object;
  }
  async validateVideo(file) {
    const frontendVideoValidator = new FrontendVideoValidator(file);
    return await frontendVideoValidator.validate();
  }
  async validateImage(file) {
    const frontendImageValidator = new FrontendImageValidator(file);
    return await frontendImageValidator.validate();
  }
  async validateVast(url) {
    const frontendVastValidator = new FrontendVastValidator(url);
    return await frontendVastValidator.validate();
  }
};

// src/main/creative-validator.ts
var CreativeValidator = class {
  validatorStrategy;
  constructor(validationType) {
    this.validatorStrategy = validationType === "backend" ? new BackendValidatorStrategy() : new FrontendValidatorStrategy();
  }
  async validate(type, file) {
    return await this.validatorStrategy.validate(type, file);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreativeValidator
});
//# sourceMappingURL=index.cjs.map