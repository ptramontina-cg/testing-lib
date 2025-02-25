export function normalizeFileType(type: string): string {
  return (type.includes("/") ? type.split("/")[1] : type).toUpperCase();
}
