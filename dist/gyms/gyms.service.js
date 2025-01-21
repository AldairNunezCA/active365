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
exports.GymsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const gyms_entity_1 = require("../entities/gyms.entity");
const typeorm_2 = require("typeorm");
const data = require("../seeders/gyms.json");
const bcrypt = require("bcrypt");
const status_enum_1 = require("../enums/status.enum");
const users_entity_1 = require("../entities/users.entity");
const reviewsGyms_entity_1 = require("../entities/reviewsGyms.entity");
let GymsService = class GymsService {
    constructor(gymsRepository, usersRepository, reviewsRepository) {
        this.gymsRepository = gymsRepository;
        this.usersRepository = usersRepository;
        this.reviewsRepository = reviewsRepository;
    }
    async addGyms() {
        for (const gym of data.gyms) {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(gym.password, saltRounds);
            const newGym = new gyms_entity_1.Gyms();
            newGym.name = gym.name;
            newGym.email = gym.email;
            newGym.password = hashedPassword;
            newGym.phone = gym.phone;
            newGym.address = gym.address;
            newGym.city = gym.city;
            newGym.latitude = gym.latitude;
            newGym.longitude = gym.longitude;
            await this.gymsRepository
                .createQueryBuilder()
                .insert()
                .into(gyms_entity_1.Gyms)
                .values(newGym)
                .orUpdate(['password', 'phone', 'address', 'city', 'name', 'latitude', 'longitude'], ['email'])
                .execute();
        }
        ;
        return `The Gyms have been added`;
    }
    async getGyms() {
        const gyms = await this.gymsRepository.find({
            relations: ['users', 'classes'],
            select: ['id', 'name', 'email', 'phone', 'address', 'city', 'latitude', 'longitude', 'rol', 'createdAt', 'users', 'status'],
        });
        if (gyms.length === 0) {
            throw new common_1.NotFoundException('No gyms registered in the database were found');
        }
        ;
        return gyms;
    }
    async getById(id) {
        const gymFound = await this.gymsRepository.findOne({
            where: { id: id },
            relations: ['users', 'classes', 'reviews'],
            select: ['id', 'name', 'email', 'phone', 'address', 'city', 'latitude', 'longitude', 'rol', 'createdAt', 'users', 'classes', 'reviews', 'status'],
        });
        if (!gymFound) {
            throw new common_1.NotFoundException(`Gym with ID ${id} not found.`);
        }
        gymFound.reviews = gymFound.reviews.map(review => ({
            ...review,
            rating: typeof review.rating === 'string' ? parseFloat(review.rating) : review.rating
        }));
        return gymFound;
    }
    async getByClass(classId) {
        const gyms = await this.gymsRepository.find({
            relations: ['classes'],
            where: {
                classes: { id: classId },
            },
            select: ['id', 'name', 'email', 'phone', 'address', 'classes', 'status']
        });
        if (!gyms || gyms.length === 0) {
            throw new common_1.NotFoundException(`No gyms found for the class with ID ${classId}.`);
        }
        return gyms.map(gym => ({
            ...gym,
            classes: gym.classes.map(clss => ({
                id: clss.id,
                name: clss.name
            }))
        }));
    }
    async updateGym(id, gym) {
        const gymUpdate = await this.gymsRepository.findOneBy({ id });
        if (!gymUpdate) {
            throw new common_1.NotFoundException(`Gym with ID ${id} not found.`);
        }
        Object.assign(gymUpdate, gym);
        await this.gymsRepository.save(gymUpdate);
        return {
            message: `Gym with ID ${id} has been succesfully modified`
        };
    }
    async toggleGymStatus(gymId) {
        const gym = await this.gymsRepository.findOne({ where: { id: gymId } });
        if (!gym) {
            throw new common_1.NotFoundException(`Gym with ID ${gymId} not found.`);
        }
        if (gym.status === status_enum_1.statusGym.active) {
            gym.status = status_enum_1.statusGym.inactive;
        }
        else if (gym.status === status_enum_1.statusGym.inactive) {
            gym.status = status_enum_1.statusGym.active;
        }
        else {
            throw new Error('Unexpected Gym status.');
        }
        await this.gymsRepository.save(gym);
        return { message: `Gym with ID ${gymId} has been ${gym.status === status_enum_1.statusGym.active ? 'activated' : 'deactivated'} successfully.` };
    }
    async addReview(review) {
        const gym = await this.gymsRepository.findOne({
            where: { id: review.gymId },
            relations: ['reviews', 'reviews.userId']
        });
        if (!gym) {
            throw new common_1.NotFoundException(`Gym with ID ${review.gymId} not found.`);
        }
        const user = await this.usersRepository.findOne({
            where: { id: review.userId },
            relations: ['gym', 'gym.reviews']
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${review.userId} not found.`);
        }
        const hasMembership = user.gym && user.gym.id === review.gymId;
        if (!hasMembership) {
            throw new common_1.ForbiddenException(`The user has not have a membership on this gym`);
        }
        const existingReview = gym.reviews.find(rev => rev.userId.id === review.userId);
        if (existingReview) {
            existingReview.rating = review.rating;
            existingReview.comment = review.comment;
            await this.reviewsRepository.save(existingReview);
            return {
                message: `Review update done.`,
            };
        }
        else {
            const newReview = new reviewsGyms_entity_1.ReviewsGyms();
            newReview.gymId = gym;
            newReview.userId = user;
            newReview.rating = review.rating;
            newReview.comment = review.comment;
            await this.reviewsRepository.save(newReview);
            gym.reviews.push(newReview);
            await this.gymsRepository.save(gym);
            return {
                message: `Review done.`,
            };
        }
    }
};
exports.GymsService = GymsService;
exports.GymsService = GymsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(gyms_entity_1.Gyms)),
    __param(1, (0, typeorm_1.InjectRepository)(users_entity_1.Users)),
    __param(2, (0, typeorm_1.InjectRepository)(reviewsGyms_entity_1.ReviewsGyms)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], GymsService);
//# sourceMappingURL=gyms.service.js.map