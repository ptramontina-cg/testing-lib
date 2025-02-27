type AllowedFileTypes = "image" | "video" | "vast";

interface FrontendValidatorStrategy {
    validate(type: AllowedFileTypes, file: File | string): Promise<boolean>;
}

declare class CreativeValidator implements FrontendValidatorStrategy {
    validate(type: AllowedFileTypes, file: File | string): Promise<boolean>;
    private validateVideo;
    private validateImage;
    private validateVast;
}

export { CreativeValidator };
