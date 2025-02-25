import { BackendVideoAnalyser } from "../../utils/backend-video-analyser";

export class BackendVideoValidator {
  constructor(private file: Express.Multer.File) {}

  async validate() {
    // console.log(this.file);

    // const tsFile = new File([this.file.buffer], this.file.filename, {
    //   type: this.file.mimetype,
    // });

    // const newBuffer = await tsFile.arrayBuffer();
    // const buffer = Buffer.from(newBuffer); // Can be used in  StreamBuffers.ReadableStreamBuffer readableStreamBuffer.put(buffer);

    const backendVideoAnalyser = new BackendVideoAnalyser();
    // backendVideoAnalyser.test();
    const result = await backendVideoAnalyser.analyzeMediaBuffer(this.file);

    console.log(result);

    return true;
  }
}
