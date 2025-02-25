export declare class BackendVastValidator {
    private url;
    constructor(url: string);
    validate(): Promise<boolean>;
}
