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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const authorization_guard_1 = require("../auth/guards/authorization.guard");
const roles_decorator_1 = require("../decorators/roles.decorator");
const userRoles_enum_1 = require("../enums/userRoles.enum");
const roles_guard_1 = require("../auth/guards/roles.guard");
const platform_express_1 = require("@nestjs/platform-express");
const file_validation_pipe_1 = require("../files-upload/file-validation.pipe");
const swagger_1 = require("@nestjs/swagger");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    getUsers(page, limit) {
        if (page && limit) {
            return this.userService.getAllUsers(+page, +limit);
        }
        return this.userService.getAllUsers(1, 5);
    }
    getUserById(id) {
        return this.userService.getUserById(id);
    }
    updateUser(id, user, file) {
        return this.userService.updateUser(id, user, file);
    }
    toggleUserStatus(userId) {
        return this.userService.toggleUserStatus(userId);
    }
    setAdmin(userId) {
        return this.userService.setAdmin(userId);
    }
};
exports.UserController = UserController;
__decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Get)(),
    (0, roles_decorator_1.Rol)(userRoles_enum_1.userRoles.admin),
    (0, common_1.UseGuards)(authorization_guard_1.AuthorizationGuard, roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUsers", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(authorization_guard_1.AuthorizationGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUserById", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Rol)(userRoles_enum_1.userRoles.registered, userRoles_enum_1.userRoles.member),
    (0, common_1.UseGuards)(authorization_guard_1.AuthorizationGuard, roles_guard_1.RolesGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)(file_validation_pipe_1.ValidateImagesPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Put)('/toggle-status/:id'),
    (0, roles_decorator_1.Rol)(userRoles_enum_1.userRoles.admin, userRoles_enum_1.userRoles.partner),
    (0, common_1.UseGuards)(authorization_guard_1.AuthorizationGuard, roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "toggleUserStatus", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Put)('/setadmin/:id'),
    (0, roles_decorator_1.Rol)(userRoles_enum_1.userRoles.admin),
    (0, common_1.UseGuards)(authorization_guard_1.AuthorizationGuard, roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "setAdmin", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map