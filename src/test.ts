import * as ffmpeg from "fluent-ffmpeg";
import * as StreamBuffers from "stream-buffers";
import fs from "fs";
import { CreativeValidator } from "./main/creative-validator";

const test: File = {
  name: "test",
  size: 0,
  type: "any",
};

const cv = new CreativeValidator("frontend");
cv.validate("image", test);
