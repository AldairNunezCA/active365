import { EmailService } from 'src/email/email.service';
import { Users } from 'src/entities/users.entity';
import { UserService } from 'src/users/user.service';
import { Repository } from 'typeorm';
export declare class NotificationsService {
    private usersRepository;
    private readonly emailService;
    private readonly usersService;
    constructor(usersRepository: Repository<Users>, emailService: EmailService, usersService: UserService);
    sendMonthlyOffers(): Promise<void>;
    sendMembershipExpirationReminder(): Promise<void>;
}
