import { BackendVideoAnalyser } from "../../utils/backend-video-analyser";

export class BackendVideoValidator {
  constructor(private file: Express.Multer.File) {}

  async validate() {
    const backendVideoAnalyser = new BackendVideoAnalyser();
    const result = await backendVideoAnalyser.analyzeMediaBuffer(this.file);

    console.log("video is valid in backend!");

    return false;
  }
}
