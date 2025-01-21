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
exports.Gyms = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const users_entity_1 = require("./users.entity");
const class_entity_1 = require("./class.entity");
const userRoles_enum_1 = require("../enums/userRoles.enum");
const reviewsGyms_entity_1 = require("./reviewsGyms.entity");
const status_enum_1 = require("../enums/status.enum");
let Gyms = class Gyms {
    constructor() {
        this.id = (0, uuid_1.v4)();
    }
};
exports.Gyms = Gyms;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Gyms.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: false }),
    __metadata("design:type", String)
], Gyms.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, unique: true, nullable: false }),
    __metadata("design:type", String)
], Gyms.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], Gyms.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], Gyms.prototype, "googlePassword", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint', nullable: true }),
    __metadata("design:type", Number)
], Gyms.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Gyms.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], Gyms.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 6, nullable: true }),
    __metadata("design:type", Number)
], Gyms.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 6, nullable: true }),
    __metadata("design:type", Number)
], Gyms.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 15, nullable: false, default: userRoles_enum_1.userRoles.partner }),
    __metadata("design:type", String)
], Gyms.prototype, "rol", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 10, nullable: false, default: status_enum_1.statusGym.active }),
    __metadata("design:type", String)
], Gyms.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'date', nullable: false }),
    __metadata("design:type", Date)
], Gyms.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => class_entity_1.Classes, (classes) => classes.gym),
    __metadata("design:type", Array)
], Gyms.prototype, "classes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => users_entity_1.Users, (user) => user.gym),
    __metadata("design:type", Array)
], Gyms.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reviewsGyms_entity_1.ReviewsGyms, (reviews) => reviews.gymId, { eager: true }),
    __metadata("design:type", Array)
], Gyms.prototype, "reviews", void 0);
exports.Gyms = Gyms = __decorate([
    (0, typeorm_1.Entity)({ name: 'Gyms' })
], Gyms);
//# sourceMappingURL=gyms.entity.js.map