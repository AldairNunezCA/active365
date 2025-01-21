import { Users } from "./users.entity";
import { OrderDetails } from "./orderDetails.entity";
import { statusOrder } from "src/enums/status.enum";
export declare class Orders {
    id: string;
    date: Date;
    user: Users;
    orderDetails: OrderDetails;
    status: statusOrder;
}
