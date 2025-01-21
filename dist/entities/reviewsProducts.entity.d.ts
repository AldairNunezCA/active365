import { Users } from "./users.entity";
import { Products } from "./products.entity";
export declare class ReviewsProducts {
    id: string;
    rating: number;
    comment: string;
    userId: Users;
    productId: Products;
}
