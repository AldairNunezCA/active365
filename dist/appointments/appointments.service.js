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
exports.AppointmentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const appointments_entity_1 = require("../entities/appointments.entity");
const class_entity_1 = require("../entities/class.entity");
const users_entity_1 = require("../entities/users.entity");
const typeorm_2 = require("typeorm");
const date_fns_1 = require("date-fns");
const email_service_1 = require("../email/email.service");
const status_enum_1 = require("../enums/status.enum");
let AppointmentsService = class AppointmentsService {
    constructor(dataSource, appointmentsRepository, classesRepository, usersRepository, emailService) {
        this.dataSource = dataSource;
        this.appointmentsRepository = appointmentsRepository;
        this.classesRepository = classesRepository;
        this.usersRepository = usersRepository;
        this.emailService = emailService;
    }
    async createAppointment(userId, classId) {
        return await this.dataSource.transaction(async (manager) => {
            const user = await manager.findOne(users_entity_1.Users, { where: { id: userId } });
            if (!user) {
                throw new common_1.NotFoundException(`User with ID ${userId} not found.`);
            }
            const gymClass = await manager.findOne(class_entity_1.Classes, {
                where: { id: classId },
                relations: ['gym'],
            });
            if (!gymClass) {
                throw new common_1.NotFoundException(`Class with ID ${classId} not found.`);
            }
            const currentTime = new Date();
            const dateObject = new Date(gymClass.date);
            const classStartTime = (0, date_fns_1.parseISO)(`${dateObject.toISOString().split('T')[0]}T${gymClass.time}`);
            const oneHourBeforeClass = (0, date_fns_1.subHours)(classStartTime, 1);
            const currentAppointments = await manager.count(appointments_entity_1.Appointments, {
                where: { classes: gymClass },
            });
            if (currentAppointments >= gymClass.capacity) {
                throw new common_1.BadRequestException('No spots available for this class.');
            }
            const appointment = manager.create(appointments_entity_1.Appointments, {
                user,
                userId: user.id,
                classes: gymClass,
                date: gymClass.date,
                time: gymClass.time,
            });
            await manager.save(appointments_entity_1.Appointments, appointment);
            gymClass.capacity -= 1;
            await manager.save(class_entity_1.Classes, gymClass);
            await this.emailService.sendClassConfirmationEmail(user.email, user.name, gymClass.name, gymClass.gym.name, dateObject.toISOString().split('T')[0], gymClass.time);
            return {
                id: appointment.id,
                date: appointment.date,
                time: appointment.time,
                gymName: gymClass.gym.name,
                className: gymClass.name,
                status: appointment.status,
            };
        });
    }
    async cancelAppointment(appointmentId) {
        return await this.dataSource.transaction(async (manager) => {
            const appointment = await manager.findOne(appointments_entity_1.Appointments, {
                where: { id: appointmentId },
                relations: ['classes', 'user', 'classes.gym'],
            });
            if (!appointment) {
                throw new common_1.NotFoundException(`Appointment with ID ${appointmentId} not found.`);
            }
            if (appointment.status !== status_enum_1.statusAppointment.active) {
                throw new common_1.BadRequestException(`Cannot cancel an appointment that is ${appointment.status}.`);
            }
            const currentTime = new Date();
            const dateObject = new Date(appointment.date);
            const classStartTime = (0, date_fns_1.parseISO)(`${dateObject.toISOString().split('T')[0]}T${appointment.time}`);
            const oneHourBeforeClass = (0, date_fns_1.subHours)(classStartTime, 1);
            if ((0, date_fns_1.isBefore)(currentTime, oneHourBeforeClass) === false) {
                throw new common_1.BadRequestException('Appointments can only be cancelled up to 1 hour before the class.');
            }
            const classDate = new Date(appointment.classes.date);
            appointment.status = status_enum_1.statusAppointment.cancelled;
            await manager.save(appointments_entity_1.Appointments, appointment);
            appointment.classes.capacity += 1;
            await manager.save(class_entity_1.Classes, appointment.classes);
            await this.emailService.sendAppointmentCancellationEmail(appointment.user.email, appointment.user.name, appointment.classes.name, appointment.classes.gym.name, classDate.toISOString().split('T')[0], appointment.classes.time);
            return {
                message: 'Appointment cancelled successfully.',
                appointmentId: appointment.id,
                className: appointment.classes.name,
                status: appointment.status,
            };
        });
    }
    async modifyAppointment(appointmentId, newClassId) {
        return await this.dataSource.transaction(async (manager) => {
            const appointment = await manager.findOne(appointments_entity_1.Appointments, {
                where: { id: appointmentId },
                relations: ['classes', 'user', 'classes.gym'],
            });
            if (!appointment) {
                throw new common_1.NotFoundException(`Appointment with ID ${appointmentId} not found.`);
            }
            if (appointment.status !== status_enum_1.statusAppointment.active) {
                throw new common_1.BadRequestException(`Cannot modify an appointment that is ${appointment.status}.`);
            }
            if (appointment.classes.id === newClassId) {
                throw new common_1.BadRequestException('The new class must be different from the current class.');
            }
            const newClass = await manager.findOne(class_entity_1.Classes, {
                where: { id: newClassId },
                relations: ['gym'],
            });
            if (!newClass) {
                throw new common_1.NotFoundException(`Class with ID ${newClassId} not found.`);
            }
            const currentAppointments = await manager.count(appointments_entity_1.Appointments, {
                where: { classes: newClass },
            });
            if (currentAppointments >= newClass.capacity) {
                throw new common_1.BadRequestException('No spots available for the new class.');
            }
            const currentTime = new Date();
            const dateObject = new Date(appointment.date);
            const classStartTime = (0, date_fns_1.parseISO)(`${dateObject.toISOString().split('T')[0]}T${appointment.time}`);
            const oneHourBeforeClass = (0, date_fns_1.subHours)(classStartTime, 1);
            if ((0, date_fns_1.isBefore)(currentTime, oneHourBeforeClass) === false) {
                throw new common_1.BadRequestException('Appointments can only be modified up to 1 hour before the class.');
            }
            appointment.classes.capacity += 1;
            await manager.save(class_entity_1.Classes, appointment.classes);
            newClass.capacity -= 1;
            await manager.save(class_entity_1.Classes, newClass);
            const previousClass = appointment.classes;
            const previousClassDate = new Date(previousClass.date);
            appointment.classes = newClass;
            appointment.date = newClass.date;
            appointment.time = newClass.time;
            appointment.status = status_enum_1.statusAppointment.active;
            await manager.save(appointments_entity_1.Appointments, appointment);
            const newClassDate = new Date(newClass.date);
            await this.emailService.sendClassModificationEmail(appointment.user.email, appointment.user.name, previousClass.name, previousClass.gym.name, previousClassDate.toISOString().split('T')[0], previousClass.time, newClass.name, newClass.gym.name, newClassDate.toISOString().split('T')[0], newClass.time);
            return {
                id: appointment.id,
                date: appointment.date,
                time: appointment.time,
                gymName: newClass.gym.name,
                className: newClass.name,
                status: appointment.status,
            };
        });
    }
};
exports.AppointmentsService = AppointmentsService;
exports.AppointmentsService = AppointmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(appointments_entity_1.Appointments)),
    __param(2, (0, typeorm_1.InjectRepository)(class_entity_1.Classes)),
    __param(3, (0, typeorm_1.InjectRepository)(users_entity_1.Users)),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        email_service_1.EmailService])
], AppointmentsService);
//# sourceMappingURL=appointments.service.js.map