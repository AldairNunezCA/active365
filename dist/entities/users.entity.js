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
exports.Users = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const typeorm_2 = require("typeorm");
const gyms_entity_1 = require("./gyms.entity");
const orders_entity_1 = require("./orders.entity");
const userRoles_enum_1 = require("../enums/userRoles.enum");
const appointments_entity_1 = require("./appointments.entity");
const reviewsProducts_entity_1 = require("./reviewsProducts.entity");
const reviewsGyms_entity_1 = require("./reviewsGyms.entity");
const status_enum_1 = require("../enums/status.enum");
let Users = class Users {
    constructor() {
        this.id = (0, uuid_1.v4)();
    }
};
exports.Users = Users;
__decorate([
    (0, typeorm_2.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Users.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: false }),
    __metadata("design:type", String)
], Users.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, unique: true, nullable: false }),
    __metadata("design:type", String)
], Users.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint', nullable: true }),
    __metadata("design:type", Number)
], Users.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Users.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], Users.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 15, nullable: false, default: userRoles_enum_1.userRoles.registered }),
    __metadata("design:type", String)
], Users.prototype, "rol", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 10, nullable: false, default: status_enum_1.statusUser.active }),
    __metadata("design:type", String)
], Users.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], Users.prototype, "height", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], Users.prototype, "weight", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], Users.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], Users.prototype, "googlePassword", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: false, default: 'https://example.com/default-image.jpg' }),
    __metadata("design:type", String)
], Users.prototype, "imgUrl", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "date", nullable: false }),
    __metadata("design:type", Date)
], Users.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Users.prototype, "membershipExpiresAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => gyms_entity_1.Gyms, gym => gym.users),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", gyms_entity_1.Gyms)
], Users.prototype, "gym", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => appointments_entity_1.Appointments, appointment => appointment.user),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], Users.prototype, "appointments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => orders_entity_1.Orders, order => order.user),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], Users.prototype, "orders", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reviewsProducts_entity_1.ReviewsProducts, (review) => review.userId),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], Users.prototype, "reviews", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reviewsGyms_entity_1.ReviewsGyms, (review) => review.userId),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], Users.prototype, "reviewsGyms", void 0);
exports.Users = Users = __decorate([
    (0, typeorm_1.Entity)({ name: "Users" })
], Users);
//# sourceMappingURL=users.entity.js.map