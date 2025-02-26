"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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

// src/strategies/backend/backend-video-validator.ts
var BackendVideoValidator = class {
  constructor(file) {
    this.file = file;
  }
  async validate() {
    if (typeof process !== "undefined") {
    }
    return false;
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
      throw new Error("Invalid type for frontend validation.");
    }
    if (type === "vast" && !(file instanceof String)) {
      throw new Error("Invalid type for frontend validation.");
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
    return "name" in object && "size" in object && "type" in object;
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
    if (typeof window === "undefined") {
      this.validatorStrategy = new BackendValidatorStrategy();
    } else {
      this.validatorStrategy = new FrontendValidatorStrategy();
    }
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