import { OrdersService } from './orders.service';
import { CreateOrderDto } from 'src/dto/create-order.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    getAllOrders(): Promise<import("../entities/orders.entity").Orders[]>;
    createOrder(order: CreateOrderDto): Promise<import("../entities/orders.entity").Orders>;
    deleteOrder(orderId: string): Promise<import("../entities/orders.entity").Orders>;
    getOrdersByUser(userId: string): Promise<import("../entities/orders.entity").Orders[]>;
    getOrder(id: string): Promise<import("../entities/orders.entity").Orders>;
}
