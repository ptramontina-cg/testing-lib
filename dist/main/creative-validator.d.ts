import { AllowedFileTypes, AllowedValitators } from '../types/validator';
export declare class CreativeValidator {
    private validatorStrategy;
    constructor(validationType: AllowedValitators);
    validate(type: AllowedFileTypes, file: File | Express.Multer.File | string): void;
}
