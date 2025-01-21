import * as nodemailer from 'nodemailer';
import { ProductsService } from 'src/products/products.service';
export declare class EmailService {
    private readonly transporter;
    private readonly productsService;
    constructor(transporter: nodemailer.Transporter, productsService: ProductsService);
    sendWelcomeEmail(email: string, name: string): Promise<void>;
    sendWelcomeGymEmail(email: string, name: string): Promise<void>;
    sendOrderConfirmationEmail(email: string, orderDetails: any): Promise<void>;
    sendClassConfirmationEmail(email: string, name: string, className: string, gymName: string, classDate: string, classTime: string): Promise<void>;
    sendProductOffersEmail(email: string, name: string, shopLink: string): Promise<void>;
    sendClassModificationEmail(email: string, name: string, previousClassName: string, previousGymName: string, previousClassDate: string, previousClassTime: string, newClassName: string, newGymName: string, newClassDate: string, newClassTime: string): Promise<void>;
    sendAppointmentCancellationEmail(email: string, name: string, className: string, gymName: string, classDate: string, classTime: string): Promise<void>;
    sendMembershipConfirmationEmail(email: string, membershipDetails: any): Promise<void>;
    sendMembershipExpirationReminderEmail(email: string, membershipDetails: any): Promise<void>;
    sendOrderCancellationEmail(email: string, orderDetails: any): Promise<void>;
}
