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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassesController = void 0;
const common_1 = require("@nestjs/common");
const classes_service_1 = require("./classes.service");
const create_class_dto_1 = require("../dto/create-class.dto");
const platform_express_1 = require("@nestjs/platform-express");
const file_validation_pipe_1 = require("../files-upload/file-validation.pipe");
const roles_decorator_1 = require("../decorators/roles.decorator");
const userRoles_enum_1 = require("../enums/userRoles.enum");
const authorization_guard_1 = require("../auth/guards/authorization.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const swagger_1 = require("@nestjs/swagger");
let ClassesController = class ClassesController {
    constructor(classesService) {
        this.classesService = classesService;
    }
    getClassesByGymId(gymId) {
        return this.classesService.getClassesByGymId(gymId);
    }
    getClasses() {
        return this.classesService.getClasses();
    }
    getClasssesByGymName(name) {
        return this.classesService.getClassesByGymName(name);
    }
    cancelClass(id) {
        return this.classesService.cancelClass(id);
    }
    getClassesById(id) {
        return this.classesService.getClassesById(id);
    }
    addClasses(classes, file) {
        const { name, description, capacity, duration, date, time, gymId } = classes;
        return this.classesService.addClasses(name, description, capacity, duration, date, time, gymId, file);
    }
    updateClasses(id, classes, file) {
        return this.classesService.updateClasses(id, classes, file);
    }
};
exports.ClassesController = ClassesController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('gymId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClassesController.prototype, "getClassesByGymId", null);
__decorate([
    (0, common_1.Get)('/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ClassesController.prototype, "getClasses", null);
__decorate([
    (0, common_1.Get)('/gym/:name'),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClassesController.prototype, "getClasssesByGymName", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Put)('cancel/:id'),
    (0, roles_decorator_1.Rol)(userRoles_enum_1.userRoles.partner, userRoles_enum_1.userRoles.admin),
    (0, common_1.UseGuards)(authorization_guard_1.AuthorizationGuard, roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClassesController.prototype, "cancelClass", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClassesController.prototype, "getClassesById", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Post)(),
    (0, roles_decorator_1.Rol)(userRoles_enum_1.userRoles.partner, userRoles_enum_1.userRoles.admin),
    (0, common_1.UseGuards)(authorization_guard_1.AuthorizationGuard, roles_guard_1.RolesGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)(file_validation_pipe_1.ValidateImagesPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_class_dto_1.CreateClassDto, Object]),
    __metadata("design:returntype", void 0)
], ClassesController.prototype, "addClasses", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Rol)(userRoles_enum_1.userRoles.partner, userRoles_enum_1.userRoles.admin),
    (0, common_1.UseGuards)(authorization_guard_1.AuthorizationGuard, roles_guard_1.RolesGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)(file_validation_pipe_1.ValidateImagesPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], ClassesController.prototype, "updateClasses", null);
exports.ClassesController = ClassesController = __decorate([
    (0, common_1.Controller)('classes'),
    __metadata("design:paramtypes", [classes_service_1.ClassesService])
], ClassesController);
//# sourceMappingURL=classes.controller.js.map