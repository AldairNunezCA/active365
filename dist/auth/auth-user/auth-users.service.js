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
exports.AuthUsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_entity_1 = require("../../entities/users.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const email_service_1 = require("../../email/email.service");
const gyms_entity_1 = require("../../entities/gyms.entity");
const lodash_1 = require("lodash");
let AuthUsersService = class AuthUsersService {
    constructor(userRepository, gymRepository, jwtService, emailService) {
        this.userRepository = userRepository;
        this.gymRepository = gymRepository;
        this.jwtService = jwtService;
        this.emailService = emailService;
    }
    async login(email, passwordLogin, isGoogleLogin = false) {
        let userOrGym = await this.userRepository.findOne({ where: { email: email }, relations: ['gym', 'appointments', 'orders', 'reviews', 'reviewsGyms'] });
        if (!userOrGym) {
            userOrGym = await this.gymRepository.findOne({ where: { email: email }, relations: ['users', 'classes', 'reviews'] });
            if (userOrGym.users !== null) {
                userOrGym.users = userOrGym.users.map(user => (0, lodash_1.omit)(user, ['password', 'googlePassword']));
            }
        }
        else {
            if (userOrGym.gym !== null) {
                const { password, googlePassword, ...gymWithoutPasswords } = userOrGym.gym;
                userOrGym.gym = gymWithoutPasswords;
            }
        }
        if (!userOrGym)
            throw new common_1.NotFoundException(`Incorrect credentials`);
        const hashToCompare = isGoogleLogin ? userOrGym.googlePassword : userOrGym.password;
        if (!hashToCompare)
            throw new common_1.NotFoundException(`Incorrect credentials`);
        const isMatch = await bcrypt.compare(passwordLogin, hashToCompare);
        if (!isMatch)
            throw new common_1.NotFoundException(`Incorrect credentials`);
        const { password, googlePassword, ...userWithoutPassword } = userOrGym;
        const response = {
            id: userOrGym.id,
            email: userOrGym.email,
            rol: userOrGym.rol
        };
        const token = this.jwtService.sign(response);
        return {
            message: 'Login successful',
            token,
            user: userWithoutPassword
        };
    }
    async createUser(user, isGoogleCreate = false) {
        let gymFound = await this.gymRepository.findOne({ where: { email: user.email } });
        if (gymFound)
            throw new common_1.BadRequestException(`The email ${user.email} is currently registered as a gym`);
        const userFound = await this.userRepository.findOne({ where: { email: user.email } });
        if (userFound)
            throw new common_1.BadRequestException(`The email ${user.email} already exists`);
        const passwordToHash = isGoogleCreate ? user.googlePassword : user.password;
        if (!passwordToHash) {
            throw new common_1.BadRequestException('A password is required to create the user');
        }
        const hashedPassword = await bcrypt.hash(passwordToHash, 10);
        const newUser = this.userRepository.create({
            ...user,
            password: isGoogleCreate ? undefined : hashedPassword,
            googlePassword: isGoogleCreate ? hashedPassword : undefined,
        });
        if (!newUser)
            throw new common_1.BadRequestException('Failed to create user');
        const savedUser = await this.userRepository.save(newUser);
        const { password, googlePassword, ...userWithoutPassword } = savedUser;
        await this.emailService.sendWelcomeEmail(savedUser.email, savedUser.name);
        return userWithoutPassword;
    }
    async validateGoogleUser(googleUser) {
        let userOrGym = await this.gymRepository.findOne({ where: { email: googleUser.email } });
        if (userOrGym)
            throw new common_1.BadRequestException(`The email ${googleUser.email} is currently registered as a gym`);
        userOrGym = await this.userRepository.findOne({ where: { email: googleUser.email } });
        if (userOrGym)
            return userOrGym;
        return await this.createUser(googleUser, true);
    }
};
exports.AuthUsersService = AuthUsersService;
exports.AuthUsersService = AuthUsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.Users)),
    __param(1, (0, typeorm_1.InjectRepository)(gyms_entity_1.Gyms)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService,
        email_service_1.EmailService])
], AuthUsersService);
//# sourceMappingURL=auth-users.service.js.map