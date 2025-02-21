import { ValidatorStrategy } from '../interfaces/validator.interface';
export declare class FrontendValidatorStrategy implements ValidatorStrategy {
    validate(file?: File): Promise<boolean>;
}
