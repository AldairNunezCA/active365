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
exports.AppointmentsController = void 0;
const common_1 = require("@nestjs/common");
const appointments_service_1 = require("./appointments.service");
const create_appointment_dto_1 = require("../dto/create-appointment.dto");
const roles_decorator_1 = require("../decorators/roles.decorator");
const userRoles_enum_1 = require("../enums/userRoles.enum");
const authorization_guard_1 = require("../auth/guards/authorization.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
let AppointmentsController = class AppointmentsController {
    constructor(appointmentsService) {
        this.appointmentsService = appointmentsService;
    }
    async createAppointment(createAppointmentDto) {
        const { userId, classId } = createAppointmentDto;
        return this.appointmentsService.createAppointment(userId, classId);
    }
    async cancelAppointment(appointmentId) {
        return await this.appointmentsService.cancelAppointment(appointmentId);
    }
    async modifyAppointment(appointmentId, newClassId) {
        return this.appointmentsService.modifyAppointment(appointmentId, newClassId);
    }
};
exports.AppointmentsController = AppointmentsController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Rol)(userRoles_enum_1.userRoles.member, userRoles_enum_1.userRoles.partner, userRoles_enum_1.userRoles.admin),
    (0, common_1.UseGuards)(authorization_guard_1.AuthorizationGuard, roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_appointment_dto_1.CreateAppointmentDto]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "createAppointment", null);
__decorate([
    (0, common_1.Put)('/cancel/:id'),
    (0, roles_decorator_1.Rol)(userRoles_enum_1.userRoles.member, userRoles_enum_1.userRoles.admin),
    (0, common_1.UseGuards)(authorization_guard_1.AuthorizationGuard, roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "cancelAppointment", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Rol)(userRoles_enum_1.userRoles.member, userRoles_enum_1.userRoles.admin),
    (0, common_1.UseGuards)(authorization_guard_1.AuthorizationGuard, roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('newClassId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "modifyAppointment", null);
exports.AppointmentsController = AppointmentsController = __decorate([
    (0, common_1.Controller)('appointments'),
    __metadata("design:paramtypes", [appointments_service_1.AppointmentsService])
], AppointmentsController);
//# sourceMappingURL=appointments.controller.js.map