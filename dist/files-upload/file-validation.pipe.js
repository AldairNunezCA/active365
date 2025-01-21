"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateImagesPipe = void 0;
const common_1 = require("@nestjs/common");
let ValidateImagesPipe = class ValidateImagesPipe {
    transform(file) {
        if (!file) {
            return undefined;
        }
        const maxSizeValidator = new common_1.MaxFileSizeValidator({
            maxSize: 800000,
        });
        if (!maxSizeValidator.isValid(file)) {
            throw new common_1.BadRequestException('File size must not exceed 800 KB');
        }
        const fileTypeValidator = new common_1.FileTypeValidator({
            fileType: /(jpeg|png|gif|bmp|webp|svg\+xml)$/,
        });
        if (!fileTypeValidator.isValid(file)) {
            throw new common_1.BadRequestException('File format not allowed');
        }
        return file;
    }
};
exports.ValidateImagesPipe = ValidateImagesPipe;
exports.ValidateImagesPipe = ValidateImagesPipe = __decorate([
    (0, common_1.Injectable)()
], ValidateImagesPipe);
//# sourceMappingURL=file-validation.pipe.js.map