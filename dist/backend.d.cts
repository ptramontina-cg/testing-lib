type AllowedFileTypes = "image" | "video" | "vast";

interface BackendValidatorStrategy {
    validate(type: AllowedFileTypes, file: Express.Multer.File | string): Promise<boolean>;
}

declare class CreativeValidator implements BackendValidatorStrategy {
    validate(type: AllowedFileTypes, file: Express.Multer.File | string): Promise<boolean>;
    private validateVideo;
    private validateImage;
    private validateVast;
}

export { CreativeValidator };
