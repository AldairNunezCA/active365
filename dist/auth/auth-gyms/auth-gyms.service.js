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
exports.AuthGymsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const gyms_entity_1 = require("../../entities/gyms.entity");
const jwt_1 = require("@nestjs/jwt");
const email_service_1 = require("../../email/email.service");
const users_entity_1 = require("../../entities/users.entity");
let AuthGymsService = class AuthGymsService {
    constructor(gymsRepository, userRepository, jwtService, emailService) {
        this.gymsRepository = gymsRepository;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.emailService = emailService;
    }
    async createGym(gym, isGoogleCreate = false) {
        let userFound = await this.userRepository.findOne({ where: { email: gym.email } });
        if (userFound)
            throw new common_1.BadRequestException(`The email ${gym.email} is currently registered as a user`);
        const gymFound = await this.gymsRepository.findOne({ where: { email: gym.email } });
        if (gymFound)
            throw new common_1.BadRequestException(`El email ${gym.email} ya existe`);
        const passwordToHash = isGoogleCreate ? gym.googlePassword : gym.password;
        if (!passwordToHash) {
            throw new common_1.BadRequestException('Se requiere una contraseña para crear el usuario');
        }
        const hashedPassword = await bcrypt.hash(passwordToHash, 10);
        const newGym = this.gymsRepository.create({
            ...gym,
            password: isGoogleCreate ? undefined : hashedPassword,
            googlePassword: isGoogleCreate ? hashedPassword : undefined,
        });
        if (!newGym)
            throw new common_1.BadRequestException('No se pudo crear el usuario');
        const savedGym = await this.gymsRepository.save(newGym);
        const { password, googlePassword, ...gymWithoutPassword } = savedGym;
        await this.emailService.sendWelcomeGymEmail(savedGym.email, savedGym.name);
        return gymWithoutPassword;
    }
    async validateGoogleGym(googleGym) {
        let userOrGym = await this.userRepository.findOne({ where: { email: googleGym.email } });
        if (userOrGym)
            throw new common_1.BadRequestException(`The email ${googleGym.email} is currently registered as a user`);
        userOrGym = await this.gymsRepository.findOne({ where: { email: googleGym.email } });
        if (userOrGym)
            return userOrGym;
        return await this.createGym(googleGym, true);
    }
};
exports.AuthGymsService = AuthGymsService;
exports.AuthGymsService = AuthGymsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(gyms_entity_1.Gyms)),
    __param(1, (0, typeorm_1.InjectRepository)(users_entity_1.Users)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService,
        email_service_1.EmailService])
], AuthGymsService);
//# sourceMappingURL=auth-gyms.service.js.map