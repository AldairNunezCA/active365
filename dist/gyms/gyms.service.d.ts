import { Gyms } from 'src/entities/gyms.entity';
import { Repository } from 'typeorm';
import { statusGym } from 'src/enums/status.enum';
import { Users } from 'src/entities/users.entity';
import { GymReviewDto } from 'src/dto/review-gym.dto';
import { ReviewsGyms } from 'src/entities/reviewsGyms.entity';
export declare class GymsService {
    private gymsRepository;
    private usersRepository;
    private reviewsRepository;
    constructor(gymsRepository: Repository<Gyms>, usersRepository: Repository<Users>, reviewsRepository: Repository<ReviewsGyms>);
    addGyms(): Promise<string>;
    getGyms(): Promise<Gyms[]>;
    getById(id: string): Promise<Gyms>;
    getByClass(classId: string): Promise<{
        classes: {
            id: string;
            name: string;
        }[];
        id: string;
        name: string;
        email: string;
        password: string;
        googlePassword: string;
        phone: number;
        address: string;
        city: string;
        latitude: number;
        longitude: number;
        rol: string;
        status: statusGym;
        createdAt: Date;
        users: Users[];
        reviews: ReviewsGyms[];
    }[]>;
    updateGym(id: string, gym: Partial<Gyms>): Promise<{
        message: string;
    }>;
    toggleGymStatus(gymId: string): Promise<{
        message: string;
    }>;
    addReview(review: GymReviewDto): Promise<{
        message: string;
    }>;
}
