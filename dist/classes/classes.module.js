"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassesModule = void 0;
const common_1 = require("@nestjs/common");
const classes_service_1 = require("./classes.service");
const classes_controller_1 = require("./classes.controller");
const typeorm_1 = require("@nestjs/typeorm");
const class_entity_1 = require("../entities/class.entity");
const gyms_entity_1 = require("../entities/gyms.entity");
const files_upload_module_1 = require("../files-upload/files-upload.module");
let ClassesModule = class ClassesModule {
    constructor(classesService) {
        this.classesService = classesService;
    }
    async onModuleInit() {
        await this.classesService.classesSeeder();
    }
};
exports.ClassesModule = ClassesModule;
exports.ClassesModule = ClassesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([class_entity_1.Classes, gyms_entity_1.Gyms]), files_upload_module_1.FilesUploadModule],
        controllers: [classes_controller_1.ClassesController],
        providers: [classes_service_1.ClassesService],
    }),
    __metadata("design:paramtypes", [classes_service_1.ClassesService])
], ClassesModule);
//# sourceMappingURL=classes.module.js.map