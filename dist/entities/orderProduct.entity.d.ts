import { Products } from "./products.entity";
import { OrderDetails } from "./orderDetails.entity";
export declare class OrderProduct {
    id: string;
    product: Products;
    orderDetails: OrderDetails;
    quantity: number;
    price: number;
}
