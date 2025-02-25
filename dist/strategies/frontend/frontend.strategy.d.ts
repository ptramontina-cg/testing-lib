import { ValidatorStrategy } from '../../interfaces/validator.interface';
import { AllowedFileTypes } from '../../types/validator';
export declare class FrontendValidatorStrategy implements ValidatorStrategy {
    validate(type: AllowedFileTypes, file?: File | Express.Multer.File | string): Promise<boolean>;
    private isFile;
    private validateVideo;
    private validateImage;
    private validateVast;
}
