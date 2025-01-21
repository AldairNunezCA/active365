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
exports.GymsController = void 0;
const common_1 = require("@nestjs/common");
const gyms_service_1 = require("./gyms.service");
const create_gym_dto_1 = require("../dto/create-gym.dto");
const review_gym_dto_1 = require("../dto/review-gym.dto");
const roles_decorator_1 = require("../decorators/roles.decorator");
const userRoles_enum_1 = require("../enums/userRoles.enum");
const authorization_guard_1 = require("../auth/guards/authorization.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
let GymsController = class GymsController {
    constructor(gymsService) {
        this.gymsService = gymsService;
    }
    findAll() {
        return this.gymsService.getGyms();
    }
    addReview(review) {
        return this.gymsService.addReview(review);
    }
    findById(id) {
        return this.gymsService.getById(id);
    }
    findByClass(Class) {
        return this.gymsService.getByClass(Class);
    }
    updateGym(id, gym) {
        return this.gymsService.updateGym(id, gym);
    }
    toggleGymStatus(gymId) {
        return this.gymsService.toggleGymStatus(gymId);
    }
};
exports.GymsController = GymsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GymsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('review'),
    (0, roles_decorator_1.Rol)(userRoles_enum_1.userRoles.member),
    (0, common_1.UseGuards)(authorization_guard_1.AuthorizationGuard, roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [review_gym_dto_1.GymReviewDto]),
    __metadata("design:returntype", void 0)
], GymsController.prototype, "addReview", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GymsController.prototype, "findById", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Rol)(userRoles_enum_1.userRoles.member, userRoles_enum_1.userRoles.admin),
    (0, common_1.UseGuards)(authorization_guard_1.AuthorizationGuard, roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Param)('class')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GymsController.prototype, "findByClass", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Rol)(userRoles_enum_1.userRoles.admin, userRoles_enum_1.userRoles.partner),
    (0, common_1.UseGuards)(authorization_guard_1.AuthorizationGuard, roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_gym_dto_1.CreateGymDto]),
    __metadata("design:returntype", void 0)
], GymsController.prototype, "updateGym", null);
__decorate([
    (0, common_1.Put)('/toggle-status/:id'),
    (0, roles_decorator_1.Rol)(userRoles_enum_1.userRoles.admin),
    (0, common_1.UseGuards)(authorization_guard_1.AuthorizationGuard, roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GymsController.prototype, "toggleGymStatus", null);
exports.GymsController = GymsController = __decorate([
    (0, common_1.Controller)('gyms'),
    __metadata("design:paramtypes", [gyms_service_1.GymsService])
], GymsController);
//# sourceMappingURL=gyms.controller.js.map