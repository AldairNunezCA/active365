import { Users } from "./users.entity";
import { Gyms } from "./gyms.entity";
export declare class ReviewsGyms {
    id: string;
    rating: number;
    comment: string;
    userId: Users;
    gymId: Gyms;
}
