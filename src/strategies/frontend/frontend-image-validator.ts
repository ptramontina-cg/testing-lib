export class FrontendImageValidator {
  constructor(private file: File) {}

  async validate() {
    console.log(this.file);

    const img = await this.getImageFromFile(this.file);
    console.log(img.width, img.height);

    return true;
  }

  async getImageFromFile(file: File): Promise<HTMLImageElement> {
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
