import { StripeService } from './stripe.service';
export declare class StripeController {
    private readonly stripeService;
    constructor(stripeService: StripeService);
    successCheckout(): Promise<string>;
    cancelCheckout(): Promise<string>;
    sessionStatus(sessionId: string): Promise<{
        status: import("stripe").Stripe.Checkout.Session.Status;
        customer_email: string;
    }>;
    getCheckoutSession(orderId: string): Promise<import("stripe").Stripe.Response<import("stripe").Stripe.Checkout.Session>>;
}
