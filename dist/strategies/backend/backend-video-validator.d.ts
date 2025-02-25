export declare class BackendVideoValidator {
    private file;
    constructor(file: Express.Multer.File);
    validate(): Promise<boolean>;
}
