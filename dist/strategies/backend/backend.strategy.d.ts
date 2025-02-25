import { ValidatorStrategy } from '../../interfaces/validator.interface';
import { AllowedFileTypes } from '../../types/validator';
export declare class BackendValidatorStrategy implements ValidatorStrategy {
    validate(type: AllowedFileTypes, file?: File | Express.Multer.File | string): Promise<boolean>;
    private isMulterFile;
    private validateVideo;
    private validateImage;
    private validateVast;
}
