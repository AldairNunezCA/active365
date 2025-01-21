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
exports.AuthUsersController = void 0;
const common_1 = require("@nestjs/common");
const auth_users_service_1 = require("./auth-users.service");
const users_dto_1 = require("../../dto/users.dto");
const googleUserAuth_guard_1 = require("../guards/googleUserAuth.guard");
const generateGooglePassword_util_1 = require("../../utils/generateGooglePassword.util");
let AuthUsersController = class AuthUsersController {
    constructor(authUsersService) {
        this.authUsersService = authUsersService;
    }
    login(userCredentials) {
        if (userCredentials.email && userCredentials.password) {
            const { email, password } = userCredentials;
            return this.authUsersService.login(email, password);
        }
        return { message: 'Faltan datos' };
    }
    createUser(user) {
        return this.authUsersService.createUser(user);
    }
    googleLogin() { }
    async googleCallback(req, res) {
        if (req.user.email) {
            const email = req.user.email;
            const password = (0, generateGooglePassword_util_1.reverseAndMixEmail)(req.user.email);
            const response = await this.authUsersService.login(email, password, true);
            res.redirect(`http://localhost:3001?token=${response.token}`);
        }
        return { message: 'Faltan datos' };
    }
};
exports.AuthUsersController = AuthUsersController;
__decorate([
    (0, common_1.Post)('signin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_dto_1.LoginUserDto]),
    __metadata("design:returntype", void 0)
], AuthUsersController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], AuthUsersController.prototype, "createUser", null);
__decorate([
    (0, common_1.Get)('google/login'),
    (0, common_1.UseGuards)(googleUserAuth_guard_1.GoogleUserAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthUsersController.prototype, "googleLogin", null);
__decorate([
    (0, common_1.Get)('google/callback'),
    (0, common_1.UseGuards)(googleUserAuth_guard_1.GoogleUserAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthUsersController.prototype, "googleCallback", null);
exports.AuthUsersController = AuthUsersController = __decorate([
    (0, common_1.Controller)('auth-users'),
    __metadata("design:paramtypes", [auth_users_service_1.AuthUsersService])
], AuthUsersController);
//# sourceMappingURL=auth-users.controller.js.map