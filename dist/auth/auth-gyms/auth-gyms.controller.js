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
exports.AuthGymsController = void 0;
const common_1 = require("@nestjs/common");
const googleGymAuth_guard_1 = require("../guards/googleGymAuth.guard");
const create_gym_dto_1 = require("../../dto/create-gym.dto");
const generateGooglePassword_util_1 = require("../../utils/generateGooglePassword.util");
const auth_gyms_service_1 = require("./auth-gyms.service");
const auth_users_service_1 = require("../auth-user/auth-users.service");
let AuthGymsController = class AuthGymsController {
    constructor(authGymsService, authUsersService) {
        this.authGymsService = authGymsService;
        this.authUsersService = authUsersService;
    }
    createUser(gym) {
        return this.authGymsService.createGym(gym);
    }
    googleLogin() { }
    async googleCallback(req) {
        if (req.user.email) {
            const email = req.user.email;
            const password = (0, generateGooglePassword_util_1.reverseAndMixEmail)(req.user.email);
            return this.authUsersService.login(email, password, true);
        }
        return { message: 'Faltan datos' };
    }
};
exports.AuthGymsController = AuthGymsController;
__decorate([
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_gym_dto_1.CreateGymDto]),
    __metadata("design:returntype", void 0)
], AuthGymsController.prototype, "createUser", null);
__decorate([
    (0, common_1.Get)('google/login'),
    (0, common_1.UseGuards)(googleGymAuth_guard_1.GoogleGymAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthGymsController.prototype, "googleLogin", null);
__decorate([
    (0, common_1.Get)('google/callback'),
    (0, common_1.UseGuards)(googleGymAuth_guard_1.GoogleGymAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthGymsController.prototype, "googleCallback", null);
exports.AuthGymsController = AuthGymsController = __decorate([
    (0, common_1.Controller)('auth-gyms'),
    __metadata("design:paramtypes", [auth_gyms_service_1.AuthGymsService,
        auth_users_service_1.AuthUsersService])
], AuthGymsController);
//# sourceMappingURL=auth-gyms.controller.js.map