import { GymsService } from './gyms.service';
import { CreateGymDto } from '../dto/create-gym.dto';
import { GymReviewDto } from 'src/dto/review-gym.dto';
export declare class GymsController {
    private readonly gymsService;
    constructor(gymsService: GymsService);
    findAll(): Promise<import("../entities/gyms.entity").Gyms[]>;
    addReview(review: GymReviewDto): Promise<{
        message: string;
    }>;
    findById(id: string): Promise<import("../entities/gyms.entity").Gyms>;
    findByClass(Class: string): Promise<{
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
        status: import("../enums/status.enum").statusGym;
        createdAt: Date;
        users: import("../entities/users.entity").Users[];
        reviews: import("../entities/reviewsGyms.entity").ReviewsGyms[];
    }[]>;
    updateGym(id: string, gym: CreateGymDto): Promise<{
        message: string;
    }>;
    toggleGymStatus(gymId: string): Promise<{
        message: string;
    }>;
}
