type AllowedValitators = "backend" | "frontend";
type AllowedFileTypes = "image" | "video" | "vast";

declare class CreativeValidator {
    private validatorStrategy;
    constructor(validationType: AllowedValitators);
    validate(type: AllowedFileTypes, file: File | Express.Multer.File | string): void;
}

export { CreativeValidator };
