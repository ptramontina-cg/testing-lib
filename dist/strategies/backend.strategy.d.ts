import { ValidatorStrategy } from '../interfaces/validator.interface';
export declare class BackendValidatorStrategy implements ValidatorStrategy {
    validate(file: File): Promise<boolean>;
}
