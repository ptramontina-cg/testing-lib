import { AllowedFileTypes } from '../types/validator';
export interface ValidatorStrategy {
    validate(type: AllowedFileTypes, file?: File | Express.Multer.File | string): Promise<boolean>;
}
