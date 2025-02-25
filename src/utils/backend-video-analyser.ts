import ffmpeg from "fluent-ffmpeg";
import StreamBuffers from "stream-buffers";
import fs from "fs/promises";
import path from "path";
import { VideoOrImageMetadata } from "../types/validator";

// import { fileURLToPath } from "url";
// const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
// const __dirname = path.dirname(__filename); // get the name of the directory

export class BackendVideoAnalyser {
  constructor() {
    if (process.platform === "win32") {
      ffmpeg.setFfmpegPath("C:/ffmpeg-master-latest-win64-gpl/bin/ffmpeg.exe");
      ffmpeg.setFfprobePath(
        "C:/ffmpeg-master-latest-win64-gpl/bin/ffprobe.exe"
      );
    }
  }

  private getResolutionQuality(width: number, height: number): string {
    if (width >= 3840 && height >= 2160) return "4K";
    if (width >= 2048 && height >= 1080) return "2K";
    if (width >= 1920 && height >= 1080) return "Full HD";
    if (width >= 1280 && height >= 720) return "HD";
    return "SD";
  }

  test() {
    console.log("test from here");
    // console.log(ffmpeg);
    // console.log(StreamBuffers);
    console.log(fs);
  }

  /**
   * Generates a screenshot from the middle of a video.
   * @param {Object} file - Express file object containing video data.
   * @returns {Promise<Buffer>} - A buffer of the generated screenshot.
   */
  private async generateThumbnail(file: Express.Multer.File): Promise<Buffer> {
    const tempDir = path.join(__dirname, "tmp");
    const tempInputPath = path.join(tempDir, `temp_${Date.now()}`);
    const tempOutputPath = path.join(tempDir, `screenshot_${Date.now()}.png`);

    await fs.mkdir(tempDir, { recursive: true });
    await fs.writeFile(tempInputPath, file.buffer);

    return new Promise((resolve, reject) => {
      ffmpeg(tempInputPath)
        .on("error", async (err) => {
          console.error("Error generating screenshot:", err);
          reject(err);
        })
        .on("end", async () => {
          try {
            const screenshotBuffer = await fs.readFile(tempOutputPath);
            await fs.unlink(tempInputPath).catch(() => {});
            await fs.unlink(tempOutputPath).catch(() => {});
            resolve(screenshotBuffer);
          } catch (readError) {
            reject(readError);
          }
        })
        .screenshots({
          timestamps: ["50%"],
          filename: path.basename(tempOutputPath),
          folder: tempDir,
        });
    });
  }

  async analyzeMediaBuffer(
    file: Express.Multer.File
  ): Promise<VideoOrImageMetadata> {
    return new Promise((resolve, reject) => {
      const readableStreamBuffer = new StreamBuffers.ReadableStreamBuffer({
        frequency: 10,
        chunkSize: 2048,
      });

      readableStreamBuffer.put(file.buffer);
      readableStreamBuffer.stop();

      ffmpeg(readableStreamBuffer).ffprobe(async (err, data) => {
        if (err) {
          reject(err);
          return;
        }

        const videoOrImageStream = data.streams.find(
          (stream) =>
            stream.codec_type === "video" || stream.codec_type === "image"
        );

        if (!videoOrImageStream) {
          reject(new Error("No video or image stream found"));
          return;
        }

        const result: VideoOrImageMetadata = {
          type: videoOrImageStream.codec_type + "",
          resolution: {
            width: videoOrImageStream.width as number,
            height: videoOrImageStream.height as number,
          },
          format: data.format.format_name + "",
        };

        // Add video-specific properties and generate thumbnail if it's a video
        if (file.mimetype.startsWith("video")) {
          result.durationInSeconds = videoOrImageStream.duration
            ? Math.floor(parseFloat(videoOrImageStream.duration))
            : undefined;
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
}
