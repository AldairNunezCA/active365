"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUsersModule = void 0;
const common_1 = require("@nestjs/common");
const auth_users_service_1 = require("./auth-users.service");
const auth_users_controller_1 = require("./auth-users.controller");
const config_1 = require("@nestjs/config");
const googleOauth_config_1 = require("../../config/googleOauth.config");
const users_entity_1 = require("../../entities/users.entity");
const typeorm_1 = require("@nestjs/typeorm");
const googleUser_strategy_1 = require("../../strategies/googleUser.strategy");
const email_module_1 = require("../../email/email.module");
const gyms_entity_1 = require("../../entities/gyms.entity");
let AuthUsersModule = class AuthUsersModule {
};
exports.AuthUsersModule = AuthUsersModule;
exports.AuthUsersModule = AuthUsersModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule.forFeature(googleOauth_config_1.default),
            typeorm_1.TypeOrmModule.forFeature([users_entity_1.Users]),
            typeorm_1.TypeOrmModule.forFeature([gyms_entity_1.Gyms]),
            email_module_1.EmailModule],
        controllers: [auth_users_controller_1.AuthUsersController],
        providers: [auth_users_service_1.AuthUsersService, googleUser_strategy_1.GoogleStrategyForUsers],
        exports: [auth_users_service_1.AuthUsersService],
    })
], AuthUsersModule);
//# sourceMappingURL=auth-users.module.js.map