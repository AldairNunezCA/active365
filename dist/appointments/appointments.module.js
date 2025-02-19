"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentsModule = void 0;
const common_1 = require("@nestjs/common");
const appointments_service_1 = require("./appointments.service");
const appointments_controller_1 = require("./appointments.controller");
const typeorm_1 = require("@nestjs/typeorm");
const appointments_entity_1 = require("../entities/appointments.entity");
const class_entity_1 = require("../entities/class.entity");
const users_entity_1 = require("../entities/users.entity");
const email_module_1 = require("../email/email.module");
let AppointmentsModule = class AppointmentsModule {
};
exports.AppointmentsModule = AppointmentsModule;
exports.AppointmentsModule = AppointmentsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([appointments_entity_1.Appointments, class_entity_1.Classes, users_entity_1.Users]),
            email_module_1.EmailModule
        ],
        controllers: [appointments_controller_1.AppointmentsController],
        providers: [appointments_service_1.AppointmentsService],
    })
], AppointmentsModule);
//# sourceMappingURL=appointments.module.js.map