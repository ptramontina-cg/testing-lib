import ffmpeg from "fluent-ffmpeg";
import streambuffer from "stream-buffers";
import { promises as fs } from "fs";
import path from "path";
import { VideoOrImageMetadata } from "../definitions/validator.interfaces";

export class BackendMediaAnalyzer {
  constructor() {
    if (process && process.platform === "win32") {
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

  /**
   * Generates a screenshot from the middle of a video.
   * @param {Object} file - Express file object containing video data.
   * @returns {Promise<Buffer>} - A buffer of the generated screenshot.
   */
  private async generateThumbnail(file: Express.Multer.File): Promise<Buffer> {
    return await new Promise(async (resolve, reject) => {
      const tempDir = path.join(__dirname, "tmp");
      const tempInputPath = path.join(tempDir, `temp_${Date.now()}`);
      const tempOutputPath = path.join(tempDir, `screenshot_${Date.now()}.png`);

      await fs.mkdir(tempDir, { recursive: true });
      await fs.writeFile(tempInputPath, file.buffer);

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
      const readableStreamBuffer = new streambuffer.ReadableStreamBuffer({
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

        console.log("result.bit_rate", videoOrImageStream.bit_rate);

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
