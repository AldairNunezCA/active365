import { Categories } from "./categories.entity";
import { OrderProduct } from "./orderProduct.entity";
import { ReviewsProducts } from "./reviewsProducts.entity";
import { statusProduct } from "src/enums/status.enum";
export declare class Products {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    imgUrl: string;
    status: statusProduct;
    category: Categories;
    orderProducts: OrderProduct[];
    subcategory: string;
    reviews: ReviewsProducts[];
}
