import { BackendVideoAnalyser } from "../../utils/backend-video-analyser";

export class BackendVideoValidator {
  async validate(file: Express.Multer.File) {
    const backendVideoAnalyser = new BackendVideoAnalyser();
    const result = await backendVideoAnalyser.analyzeMediaBuffer(file);
    console.log("backend validate vast", result);

    return false;
  }
}
