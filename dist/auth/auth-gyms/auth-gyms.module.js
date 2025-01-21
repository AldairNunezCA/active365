"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGymsModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const googleOauth_config_1 = require("../../config/googleOauth.config");
const typeorm_1 = require("@nestjs/typeorm");
const auth_gyms_service_1 = require("./auth-gyms.service");
const gyms_entity_1 = require("../../entities/gyms.entity");
const auth_gyms_controller_1 = require("./auth-gyms.controller");
const googleGym_strategy_1 = require("../../strategies/googleGym.strategy");
const email_module_1 = require("../../email/email.module");
const auth_users_module_1 = require("../auth-user/auth-users.module");
const users_entity_1 = require("../../entities/users.entity");
let AuthGymsModule = class AuthGymsModule {
};
exports.AuthGymsModule = AuthGymsModule;
exports.AuthGymsModule = AuthGymsModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule.forFeature(googleOauth_config_1.default),
            typeorm_1.TypeOrmModule.forFeature([gyms_entity_1.Gyms]),
            typeorm_1.TypeOrmModule.forFeature([users_entity_1.Users]),
            email_module_1.EmailModule,
            auth_users_module_1.AuthUsersModule],
        controllers: [auth_gyms_controller_1.AuthGymsController],
        providers: [auth_gyms_service_1.AuthGymsService, googleGym_strategy_1.GoogleStrategyForGyms],
    })
], AuthGymsModule);
//# sourceMappingURL=auth-gyms.module.js.map