import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
export declare class MembershipService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<Users>);
    calculateMembershipExpiration(membershipType: string): Date;
    checkExpiredMemberships(): Promise<void>;
}
