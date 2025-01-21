import { CreateGymDto } from 'src/dto/create-gym.dto';
import { AuthGymsService } from './auth-gyms.service';
import { AuthUsersService } from '../auth-user/auth-users.service';
export declare class AuthGymsController {
    private readonly authGymsService;
    private readonly authUsersService;
    constructor(authGymsService: AuthGymsService, authUsersService: AuthUsersService);
    createUser(gym: CreateGymDto): Promise<{
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
        users: import("../../entities/users.entity").Users[];
        reviews: import("../../entities/reviewsGyms.entity").ReviewsGyms[];
    }>;
    googleLogin(): void;
    googleCallback(req: any): Promise<{
        message: string;
        token: string;
        user: {
            id: string;
            name: string;
            email: string;
            phone?: number;
            address?: string;
            city?: string;
            rol: string;
            status: import("../../enums/status.enum").statusUser;
            height?: number;
            weight?: number;
            imgUrl: string;
            createdAt: Date;
            membershipExpiresAt: Date;
            gym: import("../../entities/gyms.entity").Gyms;
            appointments: import("../../entities/appointments.entity").Appointments[];
            orders: import("../../entities/orders.entity").Orders[];
            reviews: import("../../entities/reviewsProducts.entity").ReviewsProducts[];
            reviewsGyms: import("../../entities/reviewsGyms.entity").ReviewsGyms[];
        } | {
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
            users: import("../../entities/users.entity").Users[];
            reviews: import("../../entities/reviewsGyms.entity").ReviewsGyms[];
        };
    } | {
        message: string;
    }>;
}
