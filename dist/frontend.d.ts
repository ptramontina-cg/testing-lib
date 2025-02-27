type AllowedFileTypes = "image" | "video" | "vast";

interface ValidatorStrategy {
    validate(type: AllowedFileTypes, file?: File | Express.Multer.File | string): Promise<boolean>;
}

declare class CreativeValidator implements ValidatorStrategy {
    validate(type: AllowedFileTypes, file?: File | Express.Multer.File | string): Promise<boolean>;
    private isFile;
    private validateVideo;
    private validateImage;
    private validateVast;
}

export { CreativeValidator };
