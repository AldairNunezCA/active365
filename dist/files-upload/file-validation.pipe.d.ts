import { PipeTransform } from '@nestjs/common';
export declare class ValidateImagesPipe implements PipeTransform {
    transform(file: Express.Multer.File | undefined): Express.Multer.File;
}
