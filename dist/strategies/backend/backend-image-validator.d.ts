export declare class BackendImageValidator {
    private file;
    constructor(file: Express.Multer.File);
    validate(): Promise<boolean>;
}
