"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");
const products_service_1 = require("../products/products.service");
let EmailService = class EmailService {
    constructor(transporter, productsService) {
        this.transporter = transporter;
        this.productsService = productsService;
    }
    async sendWelcomeEmail(email, name) {
        const templatePath = process.env.NODE_ENV === 'production'
            ? path.join(__dirname, '..', 'templates', 'welcome.hbs')
            : path.join(__dirname, '..', '..', 'src', 'templates', 'welcome.hbs');
        const source = fs.readFileSync(templatePath, 'utf-8');
        const compiledTemplate = handlebars.compile(source);
        const htmlToSend = compiledTemplate({ name: name });
        const mailOptions = {
            from: `"No Reply" <${process.env.MAIL_FROM}>`,
            to: email,
            subject: 'Welcome to Active365',
            html: htmlToSend
        };
        await this.transporter.sendMail(mailOptions);
    }
    async sendWelcomeGymEmail(email, name) {
        const templatePath = process.env.NODE_ENV === 'production'
            ? path.join(__dirname, '..', 'templates', 'welcomeGyms.hbs')
            : path.join(__dirname, '..', '..', 'src', 'templates', 'welcomeGyms.hbs');
        const source = fs.readFileSync(templatePath, 'utf-8');
        const compiledTemplate = handlebars.compile(source);
        const htmlToSend = compiledTemplate({ name: name });
        const mailOptions = {
            from: `"No Reply" <${process.env.MAIL_FROM}>`,
            to: email,
            subject: 'Welcome to Active365',
            html: htmlToSend
        };
        await this.transporter.sendMail(mailOptions);
    }
    async sendOrderConfirmationEmail(email, orderDetails) {
        const templatePath = process.env.NODE_ENV === 'production'
            ? path.join(__dirname, '..', 'templates', 'order-confirmation.hbs')
            : path.join(__dirname, '..', '..', 'src', 'templates', 'order-confirmation.hbs');
        const source = fs.readFileSync(templatePath, 'utf-8');
        const compiledTemplate = handlebars.compile(source);
        const htmlToSend = compiledTemplate({
            name: orderDetails.user.name,
            date: new Date(orderDetails.date).toLocaleDateString(),
            total: orderDetails.totalPrice,
            products: orderDetails.products.map((product) => ({
                name: product.name,
                quantity: product.quantity,
                price: product.price,
            })),
        });
        const mailOptions = {
            from: `"No Reply" <${process.env.MAIL_FROM}>`,
            to: email,
            subject: 'Order Confirmation - Active365',
            html: htmlToSend,
        };
        await this.transporter.sendMail(mailOptions);
    }
    async sendClassConfirmationEmail(email, name, className, gymName, classDate, classTime) {
        const templatePath = process.env.NODE_ENV === 'production'
            ? path.join(__dirname, '..', 'templates', 'class-confirmation.hbs')
            : path.join(__dirname, '..', '..', 'src', 'templates', 'class-confirmation.hbs');
        const source = fs.readFileSync(templatePath, 'utf-8');
        const compiledTemplate = handlebars.compile(source);
        const htmlToSend = compiledTemplate({
            name,
            className,
            gymName,
            classDate,
            classTime,
        });
        const mailOptions = {
            from: `"No Reply" <${process.env.MAIL_FROM}>`,
            to: email,
            subject: 'Class Confirmation - Active365',
            html: htmlToSend,
        };
        await this.transporter.sendMail(mailOptions);
    }
    async sendProductOffersEmail(email, name, shopLink) {
        const products = await this.productsService.getRandomProducts(5);
        const selectedProducts = products.slice(0, 3);
        const templatePath = process.env.NODE_ENV === 'production'
            ? path.join(__dirname, '..', 'templates', 'product-offers.hbs')
            : path.join(__dirname, '..', '..', 'src', 'templates', 'product-offers.hbs');
        const source = fs.readFileSync(templatePath, 'utf-8');
        const compiledTemplate = handlebars.compile(source);
        const htmlToSend = compiledTemplate({
            name: name,
            product1: selectedProducts[0],
            product2: selectedProducts[1],
            product3: selectedProducts[2],
            shopLink: shopLink,
        });
        const mailOptions = {
            from: `"Active365" <${process.env.MAIL_FROM}>`,
            to: email,
            subject: 'Don’t Miss Out on These Exclusive Offers!',
            html: htmlToSend,
        };
        await this.transporter.sendMail(mailOptions);
    }
    async sendClassModificationEmail(email, name, previousClassName, previousGymName, previousClassDate, previousClassTime, newClassName, newGymName, newClassDate, newClassTime) {
        const templatePath = process.env.NODE_ENV === 'production'
            ? path.join(__dirname, '..', 'templates', 'class-modification.hbs')
            : path.join(__dirname, '..', '..', 'src', 'templates', 'class-modification.hbs');
        const source = fs.readFileSync(templatePath, 'utf-8');
        const compiledTemplate = handlebars.compile(source);
        const htmlToSend = compiledTemplate({
            name,
            previousClassName,
            previousGymName,
            previousClassDate,
            previousClassTime,
            newClassName,
            newGymName,
            newClassDate,
            newClassTime,
        });
        const mailOptions = {
            from: `"No Reply" <${process.env.MAIL_FROM}>`,
            to: email,
            subject: 'Class Modification Confirmation - Active365',
            html: htmlToSend,
        };
        await this.transporter.sendMail(mailOptions);
    }
    async sendAppointmentCancellationEmail(email, name, className, gymName, classDate, classTime) {
        const templatePath = process.env.NODE_ENV === 'production'
            ? path.join(__dirname, '..', 'templates', 'class-cancellation.hbs')
            : path.join(__dirname, '..', '..', 'src', 'templates', 'class-cancellation.hbs');
        const source = fs.readFileSync(templatePath, 'utf-8');
        const compiledTemplate = handlebars.compile(source);
        const htmlToSend = compiledTemplate({
            name,
            className,
            gymName,
            classDate,
            classTime,
        });
        const mailOptions = {
            from: `"No Reply" <${process.env.MAIL_FROM}>`,
            to: email,
            subject: 'Appointment Cancellation - Active365',
            html: htmlToSend,
        };
        await this.transporter.sendMail(mailOptions);
    }
    async sendMembershipConfirmationEmail(email, membershipDetails) {
        const templatePath = process.env.NODE_ENV === 'production'
            ? path.join(__dirname, '..', 'templates', 'membership-confirmation.hbs')
            : path.join(__dirname, '..', '..', 'src', 'templates', 'membership-confirmation.hbs');
        const source = fs.readFileSync(templatePath, 'utf-8');
        const compiledTemplate = handlebars.compile(source);
        const htmlToSend = compiledTemplate({
            name: membershipDetails.user.name,
            membershipName: membershipDetails.product.name,
            expirationDate: new Date(membershipDetails.expirationDate).toLocaleDateString(),
        });
        const mailOptions = {
            from: `"No Reply" <${process.env.MAIL_FROM}>`,
            to: email,
            subject: 'Membership Confirmation - Active365',
            html: htmlToSend,
        };
        await this.transporter.sendMail(mailOptions);
    }
    async sendMembershipExpirationReminderEmail(email, membershipDetails) {
        const templatePath = process.env.NODE_ENV === 'production'
            ? path.join(__dirname, '..', 'templates', 'membership-expiration-.hbs')
            : path.join(__dirname, '..', '..', 'src', 'templates', 'membership-expiration.hbs');
        const source = fs.readFileSync(templatePath, 'utf-8');
        const compiledTemplate = handlebars.compile(source);
        const htmlToSend = compiledTemplate({
            name: membershipDetails.user.name,
            expirationDate: new Date(membershipDetails.expirationDate).toLocaleDateString(),
        });
        const mailOptions = {
            from: `"No Reply" <${process.env.MAIL_FROM}>`,
            to: email,
            subject: 'Your Membership is About to Expire - Active365',
            html: htmlToSend,
        };
        await this.transporter.sendMail(mailOptions);
    }
    async sendOrderCancellationEmail(email, orderDetails) {
        const templatePath = process.env.NODE_ENV === 'production'
            ? path.join(__dirname, '..', 'templates', 'order-cancelation.hbs')
            : path.join(__dirname, '..', '..', 'src', 'templates', 'order-cancelation.hbs');
        const source = fs.readFileSync(templatePath, 'utf-8');
        const compiledTemplate = handlebars.compile(source);
        const htmlToSend = compiledTemplate({
            name: orderDetails.user.name,
            date: new Date(orderDetails.date).toLocaleDateString(),
            total: orderDetails.totalPrice,
        });
        const mailOptions = {
            from: `"No Reply" <${process.env.MAIL_FROM}>`,
            to: email,
            subject: 'Order Cancellation Confirmation - Active365',
            html: htmlToSend,
        };
        await this.transporter.sendMail(mailOptions);
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('NODEMAILER')),
    __metadata("design:paramtypes", [Object, products_service_1.ProductsService])
], EmailService);
//# sourceMappingURL=email.service.js.map