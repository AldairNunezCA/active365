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
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const typeorm_1 = require("@nestjs/typeorm");
const email_service_1 = require("../email/email.service");
const users_entity_1 = require("../entities/users.entity");
const user_service_1 = require("../users/user.service");
const typeorm_2 = require("typeorm");
let NotificationsService = class NotificationsService {
    constructor(usersRepository, emailService, usersService) {
        this.usersRepository = usersRepository;
        this.emailService = emailService;
        this.usersService = usersService;
    }
    async sendMonthlyOffers() {
        const page = 1;
        const limit = 100;
        const users = await this.usersService.getAllUsers(page, limit);
        if (!users || users.length === 0) {
            console.log('No hay usuarios registrados para enviar correos.');
            return;
        }
        for (const user of users) {
            const email = user.email;
            const name = user.name;
            const shopLink = 'https://example.com/shop';
            await this.emailService.sendProductOffersEmail(email, name, shopLink);
        }
    }
    async sendMembershipExpirationReminder() {
        const threeDaysFromNow = new Date();
        threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);
        threeDaysFromNow.setHours(23, 59, 59, 999);
        const usersToNotify = await this.usersRepository.find({
            where: {
                membershipExpiresAt: (0, typeorm_2.LessThanOrEqual)(threeDaysFromNow),
            },
        });
        for (const user of usersToNotify) {
            await this.emailService.sendMembershipExpirationReminderEmail(user.email, {
                user: user,
                expirationDate: user.membershipExpiresAt,
            });
        }
    }
};
exports.NotificationsService = NotificationsService;
__decorate([
    (0, schedule_1.Cron)('0 0 1 * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NotificationsService.prototype, "sendMonthlyOffers", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_MIDNIGHT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NotificationsService.prototype, "sendMembershipExpirationReminder", null);
exports.NotificationsService = NotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.Users)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        email_service_1.EmailService,
        user_service_1.UserService])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map