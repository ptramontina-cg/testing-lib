export type AllowedValitators = "backend" | "frontend";
export type AllowedFileTypes = "image" | "video" | "vast";

export interface VideoOrImageResolution {
  height: number;
  width: number;
  quality?: string;
}

export interface VideoOrImageMetadata {
  type: string;
  durationInSeconds?: number;
  resolution: VideoOrImageResolution;
  bitRate?: number;
  format: string;
  thumbnail?: Buffer;
}
