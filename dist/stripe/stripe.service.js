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
exports.StripeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const orderDetails_entity_1 = require("../entities/orderDetails.entity");
const orders_entity_1 = require("../entities/orders.entity");
const users_entity_1 = require("../entities/users.entity");
const typeorm_2 = require("typeorm");
const stripe_1 = require("stripe");
let StripeService = class StripeService {
    constructor(orderDetailsRepository, ordersRepository, usersRepository) {
        this.orderDetailsRepository = orderDetailsRepository;
        this.ordersRepository = ordersRepository;
        this.usersRepository = usersRepository;
        this.stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY);
    }
    async getCheckoutSession(orderId) {
        const order = await this.ordersRepository.findOne({
            where: { id: orderId },
            relations: ['orderDetails', 'orderDetails.orderProducts', 'orderDetails.orderProducts.product'],
        });
        if (!order) {
            throw new common_1.NotFoundException(`Order with id ${orderId} not found`);
        }
        const lineItems = order.orderDetails.orderProducts.map((orderProduct) => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: orderProduct.product.name,
                },
                unit_amount: orderProduct.product.price * 100,
            },
            quantity: orderProduct.quantity,
        }));
        const session = await this.stripe.checkout.sessions.create({
            line_items: lineItems,
            mode: 'payment',
            payment_method_types: ['card'],
            success_url: `${process.env.CLIENT_URL}`,
            cancel_url: `${process.env.CLIENT_URL}`,
        });
        return session;
    }
    async sessionStatus(sessionId) {
        const session = await this.stripe.checkout.sessions.retrieve(sessionId);
        return {
            status: session.status,
            customer_email: session.customer_details.email,
        };
    }
    async successCheckout() {
        return 'Purchase successful';
    }
    async cancelCheckout() {
        return 'Purchase cancelled';
    }
};
exports.StripeService = StripeService;
exports.StripeService = StripeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(orderDetails_entity_1.OrderDetails)),
    __param(1, (0, typeorm_1.InjectRepository)(orders_entity_1.Orders)),
    __param(2, (0, typeorm_1.InjectRepository)(users_entity_1.Users)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], StripeService);
//# sourceMappingURL=stripe.service.js.map