import { Users } from './users.entity';
import { Classes } from './class.entity';
import { ReviewsGyms } from './reviewsGyms.entity';
import { statusGym } from 'src/enums/status.enum';
export declare class Gyms {
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
    classes: Classes[];
    users: Users[];
    reviews: ReviewsGyms[];
}
