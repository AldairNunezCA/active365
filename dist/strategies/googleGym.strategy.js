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
exports.GoogleStrategyForGyms = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_google_oauth20_1 = require("passport-google-oauth20");
const auth_gyms_service_1 = require("../auth/auth-gyms/auth-gyms.service");
const googleOauth_config_1 = require("../config/googleOauth.config");
const generateGooglePassword_util_1 = require("../utils/generateGooglePassword.util");
let GoogleStrategyForGyms = class GoogleStrategyForGyms extends (0, passport_1.PassportStrategy)(passport_google_oauth20_1.Strategy, 'google-gyms') {
    constructor(googleConfiguration, authGymsService) {
        super({
            clientID: googleConfiguration.clientID,
            clientSecret: googleConfiguration.clientSecret,
            callbackURL: googleConfiguration.callbackForGyms,
            scope: ['email', 'profile'],
        });
        this.googleConfiguration = googleConfiguration;
        this.authGymsService = authGymsService;
    }
    async validate(accessToken, refreshToken, profile, done) {
        const gym = await this.authGymsService.validateGoogleGym({
            email: profile.emails[0].value,
            name: profile.displayName,
            googlePassword: (0, generateGooglePassword_util_1.reverseAndMixEmail)(profile.emails[0].value),
        });
        done(null, gym);
    }
};
exports.GoogleStrategyForGyms = GoogleStrategyForGyms;
exports.GoogleStrategyForGyms = GoogleStrategyForGyms = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(googleOauth_config_1.default.KEY)),
    __metadata("design:paramtypes", [void 0, auth_gyms_service_1.AuthGymsService])
], GoogleStrategyForGyms);
//# sourceMappingURL=googleGym.strategy.js.map