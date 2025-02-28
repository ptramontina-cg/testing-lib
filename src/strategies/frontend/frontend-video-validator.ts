export class FrontendVideoValidator {
  async validate(file: File) {
    console.log("frontend validate video", file);

    const video = await this.getImageFromFile(file);
    console.log(video.videoWidth);
    console.log(video.videoHeight);

    return true;
  }

  private async getImageFromFile(file: File): Promise<HTMLVideoElement> {
    return new Promise((resolve, reject) => {
      file.arrayBuffer().then((arrayB) => {
        const blob = new Blob([arrayB], { type: file.type });
        const url = URL.createObjectURL(blob);

        let video = document.createElement("video");

        video.onloadedmetadata = () => resolve(video);
        video.src = url;
      });
    });
  }
}
