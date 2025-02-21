import { AllowedValitators } from '../types/validator';
export declare class CreativeValidator {
    private validatorStrategy;
    constructor(validationType: AllowedValitators);
    validate(file: File): void;
}
