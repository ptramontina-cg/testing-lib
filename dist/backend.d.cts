type AllowedFileTypes = "image" | "video" | "vast";

interface ValidatorStrategy {
    validate(type: AllowedFileTypes, file?: File | Express.Multer.File | string): Promise<boolean>;
}

declare class CreativeValidator implements ValidatorStrategy {
    validate(type: AllowedFileTypes, file?: File | Express.Multer.File | string): Promise<boolean>;
    private isMulterFile;
    private validateVideo;
    private validateImage;
    private validateVast;
}

export { CreativeValidator };
