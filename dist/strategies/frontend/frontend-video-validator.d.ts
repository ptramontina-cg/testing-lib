export declare class FrontendVideoValidator {
    private file;
    constructor(file: File);
    validate(): Promise<boolean>;
}
