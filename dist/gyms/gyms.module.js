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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GymsModule = void 0;
const common_1 = require("@nestjs/common");
const gyms_service_1 = require("./gyms.service");
const gyms_controller_1 = require("./gyms.controller");
const typeorm_1 = require("@nestjs/typeorm");
const gyms_entity_1 = require("../entities/gyms.entity");
const users_entity_1 = require("../entities/users.entity");
const reviewsGyms_entity_1 = require("../entities/reviewsGyms.entity");
let GymsModule = class GymsModule {
    constructor(gymsService) {
        this.gymsService = gymsService;
    }
    async onModuleInit() {
        await this.gymsService.addGyms();
    }
};
exports.GymsModule = GymsModule;
exports.GymsModule = GymsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([gyms_entity_1.Gyms]),
            typeorm_1.TypeOrmModule.forFeature([users_entity_1.Users]),
            typeorm_1.TypeOrmModule.forFeature([reviewsGyms_entity_1.ReviewsGyms]),
        ],
        controllers: [gyms_controller_1.GymsController],
        providers: [gyms_service_1.GymsService],
        exports: [gyms_service_1.GymsService]
    }),
    __metadata("design:paramtypes", [gyms_service_1.GymsService])
], GymsModule);
//# sourceMappingURL=gyms.module.js.map