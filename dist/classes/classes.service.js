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
exports.ClassesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const class_entity_1 = require("../entities/class.entity");
const gyms_entity_1 = require("../entities/gyms.entity");
const files_upload_service_1 = require("../files-upload/files-upload.service");
const typeorm_2 = require("typeorm");
const data = require("../seeders/classes.json");
const status_enum_1 = require("../enums/status.enum");
let ClassesService = class ClassesService {
    constructor(dataSource, classesRepository, gymsRepository, filesUploadService) {
        this.dataSource = dataSource;
        this.classesRepository = classesRepository;
        this.gymsRepository = gymsRepository;
        this.filesUploadService = filesUploadService;
    }
    async classesSeeder() {
        const currentDate = new Date();
        const gyms = await this.gymsRepository.find();
        for (const element of data.classes) {
            const gymData = gyms.find((gym) => gym.name === element.gym);
            if (!gymData) {
                throw new common_1.NotFoundException(`Gym with name ${element.gym} not found`);
            }
            else {
                const newClass = new class_entity_1.Classes();
                newClass.name = element.name;
                newClass.description = element.description;
                newClass.capacity = element.capacity;
                newClass.duration = element.duration;
                newClass.date = new Date(element.date);
                newClass.time = element.time;
                newClass.gym = gymData;
                if (newClass.date < currentDate) {
                    newClass.status = status_enum_1.statusClass.inactive;
                }
                await this.classesRepository.save(newClass);
            }
        }
        return 'Classes added';
    }
    async getClasses() {
        const currentDate = new Date();
        const classes = await this.classesRepository.find({
            relations: ['gym'],
            select: {
                gym: {
                    name: true,
                },
            },
        });
        return classes;
    }
    async getClassesById(id) {
        const classes = await this.classesRepository.findOne({
            where: { id },
            relations: ['gym'],
            select: {
                gym: {
                    name: true,
                },
            },
        });
        if (!classes) {
            throw new common_1.NotFoundException(`Class with id ${id} not found`);
        }
        return classes;
    }
    async getClassesByGymId(gymId) {
        const classes = await this.classesRepository.find({
            relations: ['gym'],
            where: { gym: { id: gymId } },
            select: {
                gym: {
                    name: true,
                },
            },
        });
        if (classes.length === 0) {
            throw new common_1.NotFoundException(`Classes for gym with id ${gymId} not found`);
        }
        return classes;
    }
    async getClassesByGymName(name) {
        const classes = await this.classesRepository.find({
            relations: ['gym'],
            where: { gym: { name } },
            select: {
                gym: {
                    name: true,
                },
            },
        });
        if (classes.length === 0) {
            throw new common_1.NotFoundException(`Classes for gym ${name} not found`);
        }
        return classes;
    }
    async addClasses(name, description, capacity, duration, date, time, gymId, file) {
        const currentDate = new Date();
        if (date < currentDate) {
            throw new Error('Date must be greater than current date');
        }
        return this.dataSource.transaction(async (manager) => {
            const gym = await manager.findOne(gyms_entity_1.Gyms, { where: { id: gymId } });
            if (!gym) {
                throw new common_1.NotFoundException(`Gym with id ${gymId} not found`);
            }
            let imgUrl;
            if (file) {
                const uploadImage = await this.filesUploadService.uploadImage(file);
                imgUrl = uploadImage.secure_url;
            }
            const newClass = manager.create(class_entity_1.Classes, {
                name,
                description,
                capacity,
                duration,
                date,
                time,
                gym,
                ...(imgUrl && { imgUrl }),
            });
            await manager.save(newClass);
            return `Class ${name} added successfully`;
        });
    }
    async updateClasses(id, classes, file) {
        return this.dataSource.transaction(async (manager) => {
            const classToUpdate = await manager.findOneBy(class_entity_1.Classes, { id });
            if (!classToUpdate) {
                throw new common_1.NotFoundException(`Class with id ${id} not found`);
            }
            const updateData = { ...classes };
            if (file) {
                const uploadImage = await this.filesUploadService.uploadImage(file);
                updateData.imgUrl = uploadImage.secure_url;
            }
            else if (!file && !updateData.imgUrl) {
                updateData.imgUrl = classToUpdate.imgUrl;
            }
            if (Object.keys(updateData).length > 0) {
                await manager.update(class_entity_1.Classes, { id }, updateData);
            }
            const updatedClass = await manager.findOneBy(class_entity_1.Classes, { id });
            return updatedClass;
        });
    }
    async cancelClass(id) {
        return this.dataSource.transaction(async (manager) => {
            const classToCancel = await manager.findOneBy(class_entity_1.Classes, { id });
            if (!classToCancel) {
                throw new common_1.NotFoundException(`Class with id ${id} not found`);
            }
            await manager.update(class_entity_1.Classes, { id }, { status: status_enum_1.statusClass.inactive });
            return `Class ${classToCancel.name} cancelled successfully`;
        });
    }
    ;
};
exports.ClassesService = ClassesService;
exports.ClassesService = ClassesService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(class_entity_1.Classes)),
    __param(2, (0, typeorm_1.InjectRepository)(gyms_entity_1.Gyms)),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        typeorm_2.Repository,
        typeorm_2.Repository,
        files_upload_service_1.FilesUploadService])
], ClassesService);
//# sourceMappingURL=classes.service.js.map