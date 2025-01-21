import { Orders } from "./orders.entity";
import { OrderProduct } from "./orderProduct.entity";
export declare class OrderDetails {
    id: string;
    totalPrice: number;
    order: Orders;
    orderProducts: OrderProduct[];
}
