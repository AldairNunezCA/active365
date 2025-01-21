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
exports.MembershipService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const typeorm_1 = require("@nestjs/typeorm");
const date_fns_1 = require("date-fns");
const users_entity_1 = require("../entities/users.entity");
const userRoles_enum_1 = require("../enums/userRoles.enum");
const typeorm_2 = require("typeorm");
let MembershipService = class MembershipService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    calculateMembershipExpiration(membershipType) {
        const currentDate = new Date();
        switch (membershipType.toLowerCase()) {
            case 'monthly membership':
                return (0, date_fns_1.addMonths)(currentDate, 1);
            case 'quarterly membership':
                return (0, date_fns_1.addMonths)(currentDate, 3);
            case 'semiannual membership':
                return (0, date_fns_1.addMonths)(currentDate, 6);
            case 'annual membership':
                return (0, date_fns_1.addYears)(currentDate, 1);
            default:
                throw new Error('Invalid membership type');
        }
    }
    async checkExpiredMemberships() {
        const expiredUsers = await this.usersRepository.find({
            where: {
                membershipExpiresAt: (0, typeorm_2.LessThan)(new Date()),
            },
        });
        for (const user of expiredUsers) {
            user.rol = userRoles_enum_1.userRoles.registered;
            user.membershipExpiresAt = null;
            await this.usersRepository.save(user);
        }
    }
};
exports.MembershipService = MembershipService;
__decorate([
    (0, schedule_1.Cron)('0 0 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MembershipService.prototype, "checkExpiredMemberships", null);
exports.MembershipService = MembershipService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.Users)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MembershipService);
//# sourceMappingURL=membership.service.js.map