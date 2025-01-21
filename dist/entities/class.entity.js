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
exports.Classes = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const appointments_entity_1 = require("./appointments.entity");
const gyms_entity_1 = require("./gyms.entity");
const status_enum_1 = require("../enums/status.enum");
let Classes = class Classes {
    constructor() {
        this.id = (0, uuid_1.v4)();
    }
};
exports.Classes = Classes;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Classes.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 30, nullable: false }),
    __metadata("design:type", String)
], Classes.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: false }),
    __metadata("design:type", String)
], Classes.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], Classes.prototype, "capacity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], Classes.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: false, default: 'https://plus.unsplash.com/premium_photo-1663047487227-0f3cd88ed8aa?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2xhc2UlMjBkZSUyMHlvZ2F8ZW58MHx8MHx8fDA%3D' }),
    __metadata("design:type", String)
], Classes.prototype, "imgUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: false }),
    __metadata("design:type", Date)
], Classes.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 10, nullable: false, default: status_enum_1.statusClass.active }),
    __metadata("design:type", String)
], Classes.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time', nullable: false }),
    __metadata("design:type", String)
], Classes.prototype, "time", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => gyms_entity_1.Gyms, (gym) => gym.classes, { nullable: false }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", gyms_entity_1.Gyms)
], Classes.prototype, "gym", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => appointments_entity_1.Appointments, (appointments) => appointments.classes),
    __metadata("design:type", Array)
], Classes.prototype, "appointments", void 0);
exports.Classes = Classes = __decorate([
    (0, typeorm_1.Entity)({ name: 'Classes' })
], Classes);
//# sourceMappingURL=class.entity.js.map