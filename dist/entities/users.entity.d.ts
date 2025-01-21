import { Gyms } from "./gyms.entity";
import { Orders } from "./orders.entity";
import { Appointments } from "./appointments.entity";
import { ReviewsProducts } from "./reviewsProducts.entity";
import { ReviewsGyms } from "./reviewsGyms.entity";
import { statusUser } from "src/enums/status.enum";
export declare class Users {
    id: string;
    name: string;
    email: string;
    phone?: number;
    address?: string;
    city?: string;
    rol: string;
    status: statusUser;
    height?: number;
    weight?: number;
    password: string;
    googlePassword: string;
    imgUrl: string;
    createdAt: Date;
    membershipExpiresAt: Date;
    gym: Gyms;
    appointments: Appointments[];
    orders: Orders[];
    reviews: ReviewsProducts[];
    reviewsGyms: ReviewsGyms[];
}
