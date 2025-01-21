import { OrderDetails } from 'src/entities/orderDetails.entity';
import { Orders } from 'src/entities/orders.entity';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import Stripe from 'stripe';
export declare class StripeService {
    private orderDetailsRepository;
    private ordersRepository;
    private usersRepository;
    private stripe;
    constructor(orderDetailsRepository: Repository<OrderDetails>, ordersRepository: Repository<Orders>, usersRepository: Repository<Users>);
    getCheckoutSession(orderId: string): Promise<Stripe.Response<Stripe.Checkout.Session>>;
    sessionStatus(sessionId: string): Promise<{
        status: Stripe.Checkout.Session.Status;
        customer_email: string;
    }>;
    successCheckout(): Promise<string>;
    cancelCheckout(): Promise<string>;
}
