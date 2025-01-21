import { Repository } from 'typeorm';
import { Gyms } from 'src/entities/gyms.entity';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/email/email.service';
import { Users } from 'src/entities/users.entity';
export declare class AuthGymsService {
    private readonly gymsRepository;
    private readonly userRepository;
    private readonly jwtService;
    private readonly emailService;
    constructor(gymsRepository: Repository<Gyms>, userRepository: Repository<Users>, jwtService: JwtService, emailService: EmailService);
    createGym(gym: Partial<Gyms>, isGoogleCreate?: boolean): Promise<{
        id: string;
        name: string;
        email: string;
        phone: number;
        address: string;
        city: string;
        latitude: number;
        longitude: number;
        rol: string;
        status: import("../../enums/status.enum").statusGym;
        createdAt: Date;
        classes: import("../../entities/class.entity").Classes[];
        users: Users[];
        reviews: import("../../entities/reviewsGyms.entity").ReviewsGyms[];
    }>;
    validateGoogleGym(googleGym: Partial<Gyms>): Promise<{
        id: string;
        name: string;
        email: string;
        phone: number;
        address: string;
        city: string;
        latitude: number;
        longitude: number;
        rol: string;
        status: import("../../enums/status.enum").statusGym;
        createdAt: Date;
        classes: import("../../entities/class.entity").Classes[];
        users: Users[];
        reviews: import("../../entities/reviewsGyms.entity").ReviewsGyms[];
    }>;
}
