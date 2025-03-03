export const ALLOWED_HOSTED_VIDEO_SIZES_PX = [432, 720, 1080, 1280, 2160];

export const ALLOWED_HOSTED_VIDEO_FORMATS = [
  "3G2",
  "3GP",
  "3GPP",
  "3GPP2",
  "ASF",
  "AVI",
  "X-MSVIDEO", // AVI
  "MP2T",
  "F4A",
  "F4B",
  "F4P",
  "F4V",
  "FLV",
  "X-FLV",
  "M2V",
  "M4V",
  "MKV",
  "X-MATROSKA", // MKV
  "MOV",
  "M4P",
  "MPE",
  "MPEG",
  "MP2", // MPEG-2
  "MP4", // MPEG-4
  "MPG",
  "MPV",
  "OGG",
  "OGV",
  "QT", // QuickTime
  "QUICKTIME",
  "RM",
  "SWF",
  "TS",
  "VOB",
  "WEBM",
  "WMV", // Windows Media Video
  "X-MS-WMV", // WMV
];

export const ALLOWED_DURATION_SEC = [15, 30, 60];

export const ALLOWED_HOSTED_VIDEO_MIN_BITRATES_BY_RESOLUTION = {
  2160: 30000,
  1280: 13000,
  1080: 12000,
  720: 8000,
  432: 2000,
};

export const FRONTEND_SUPPORTED_FILE_EXTENSIONS = ["WEBM", "OGG", "MP4"];

export const MAX_SIZE = 100000000;
