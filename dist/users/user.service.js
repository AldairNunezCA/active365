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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_entity_1 = require("../entities/users.entity");
const typeorm_2 = require("typeorm");
const usersSeed = require("../seeders/users.seeder.json");
const bcrypt = require("bcrypt");
const gyms_entity_1 = require("../entities/gyms.entity");
const gyms_service_1 = require("../gyms/gyms.service");
const reviewsGyms_entity_1 = require("../entities/reviewsGyms.entity");
const status_enum_1 = require("../enums/status.enum");
const userRoles_enum_1 = require("../enums/userRoles.enum");
const files_upload_service_1 = require("../files-upload/files-upload.service");
let UserService = class UserService {
    constructor(userRepository, gymsRepository, reviewsRepository, filesUploadService) {
        this.userRepository = userRepository;
        this.gymsRepository = gymsRepository;
        this.reviewsRepository = reviewsRepository;
        this.filesUploadService = filesUploadService;
    }
    async getAllUsers(page, limit) {
        const users = await this.userRepository.find();
        if (!users)
            throw new common_1.NotFoundException('No se encontraron usuarios');
        const start = (page - 1) * limit;
        const end = start + limit;
        return users.slice(start, end);
    }
    async getUserById(id) {
        const user = await this.userRepository.findOne({ where: { id }, relations: ['gym', 'reviews', 'appointments'] });
        if (!user)
            throw new common_1.NotFoundException(`El usuario con el id ${id} no existe`);
        return user;
    }
    async updateUser(id, user, file) {
        const userFound = await this.userRepository.findOne({ where: { id } });
        if (!userFound)
            throw new common_1.NotFoundException(`El usuario con el id ${id} no existe`);
        if (file) {
            const uploadImage = await this.filesUploadService.uploadImage(file);
            userFound.imgUrl = uploadImage.secure_url;
        }
        Object.assign(userFound, user);
        await this.userRepository.save(userFound);
        return `El usuario con el id ${id} ha sido actualizado`;
    }
    async waitForGyms() {
        const pollInterval = 500;
        const timeout = 10000;
        let elapsedTime = 0;
        while (elapsedTime < timeout) {
            const gymsCount = await this.gymsRepository.count();
            if (gymsCount > 0) {
                return;
            }
            await new Promise((resolve) => setTimeout(resolve, pollInterval));
            elapsedTime += pollInterval;
        }
        throw new Error('Timeout: Gyms were not initialized in time.');
    }
    async onModuleInit() {
        const gymsCount = await this.gymsRepository.count();
        if (gymsCount === 0) {
            console.log('No gyms found, initializing gyms...');
            const gymsService = new gyms_service_1.GymsService(this.gymsRepository, this.userRepository, this.reviewsRepository);
            await gymsService.addGyms();
        }
        await this.waitForGyms();
        const usersMock = await Promise.all(usersSeed.map(async (user) => {
            const gyms = await this.gymsRepository.find();
            const gymForUser = await this.gymsRepository.findOne({ where: { city: user.city } });
            const newUser = new users_entity_1.Users();
            newUser.name = user.name;
            newUser.email = user.email;
            newUser.phone = user.phone;
            newUser.address = user.address;
            newUser.city = user.city;
            newUser.rol = user.rol;
            newUser.height = user.height;
            newUser.weight = user.weight;
            newUser.password = await bcrypt.hash(user.password, 10);
            newUser.gym = gymForUser ? gymForUser : null;
            return newUser;
        }));
        for (const user of usersMock) {
            const existingUser = await this.userRepository.findOne({ where: { email: user.email } });
            if (!existingUser) {
                await this.userRepository.save(user);
            }
        }
        return 'Users added';
    }
    async toggleUserStatus(userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${userId} not found.`);
        }
        if (user.status === status_enum_1.statusUser.active) {
            user.status = status_enum_1.statusUser.inactive;
        }
        else if (user.status === status_enum_1.statusUser.inactive) {
            user.status = status_enum_1.statusUser.active;
        }
        else {
            throw new Error('Unexpected user status.');
        }
        await this.userRepository.save(user);
        return { message: `User with ID ${userId} has been ${user.status === status_enum_1.statusUser.active ? 'activated' : 'deactivated'} successfully.` };
    }
    async setAdmin(userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${userId} not found.`);
        }
        user.rol = userRoles_enum_1.userRoles.admin;
        await this.userRepository.save(user);
        return { message: `Now the user with ID ${userId} is an Admin.` };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.Users)),
    __param(1, (0, typeorm_1.InjectRepository)(gyms_entity_1.Gyms)),
    __param(2, (0, typeorm_1.InjectRepository)(reviewsGyms_entity_1.ReviewsGyms)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        files_upload_service_1.FilesUploadService])
], UserService);
//# sourceMappingURL=user.service.js.map