export declare class FrontendImageValidator {
    private file;
    constructor(file: File);
    validate(): Promise<boolean>;
    private validateSize;
    private validateResolution;
    private validateType;
    private getImageFromFile;
}
