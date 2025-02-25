import { VideoOrImageMetadata } from '../types/validator';
export declare class BackendVideoAnalyser {
    constructor();
    private getResolutionQuality;
    /**
     * Generates a screenshot from the middle of a video.
     * @param {Object} file - Express file object containing video data.
     * @returns {Promise<Buffer>} - A buffer of the generated screenshot.
     */
    private generateThumbnail;
    analyzeMediaBuffer: (file: Express.Multer.File) => Promise<VideoOrImageMetadata>;
}
