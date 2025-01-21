import { EmailService } from 'src/email/email.service';
import { ProductOrderDto } from 'src/dto/product-order.dto';
import { OrderDetails } from 'src/entities/orderDetails.entity';
import { Orders } from 'src/entities/orders.entity';
import { Products } from 'src/entities/products.entity';
import { Users } from 'src/entities/users.entity';
import { DataSource, Repository } from 'typeorm';
import { MembershipService } from 'src/membership/membership.service';
export declare class OrdersService {
    private dataSource;
    private ordersRepository;
    private usersRepository;
    private orderDetailsRepository;
    private productsRepository;
    private readonly emailService;
    private readonly membershipService;
    constructor(dataSource: DataSource, ordersRepository: Repository<Orders>, usersRepository: Repository<Users>, orderDetailsRepository: Repository<OrderDetails>, productsRepository: Repository<Products>, emailService: EmailService, membershipService: MembershipService);
    getAllOrders(): Promise<Orders[]>;
    createOrder(userId: string, products: ProductOrderDto[]): Promise<Orders>;
    getOrdersByUser(userId: string): Promise<Orders[]>;
    getOrder(id: string): Promise<Orders>;
    deleteOrder(orderId: string): Promise<Orders>;
}
