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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const email_service_1 = require("../email/email.service");
const orderDetails_entity_1 = require("../entities/orderDetails.entity");
const orderProduct_entity_1 = require("../entities/orderProduct.entity");
const orders_entity_1 = require("../entities/orders.entity");
const products_entity_1 = require("../entities/products.entity");
const users_entity_1 = require("../entities/users.entity");
const typeorm_2 = require("typeorm");
const userRoles_enum_1 = require("../enums/userRoles.enum");
const membership_service_1 = require("../membership/membership.service");
const status_enum_1 = require("../enums/status.enum");
let OrdersService = class OrdersService {
    constructor(dataSource, ordersRepository, usersRepository, orderDetailsRepository, productsRepository, emailService, membershipService) {
        this.dataSource = dataSource;
        this.ordersRepository = ordersRepository;
        this.usersRepository = usersRepository;
        this.orderDetailsRepository = orderDetailsRepository;
        this.productsRepository = productsRepository;
        this.emailService = emailService;
        this.membershipService = membershipService;
    }
    async getAllOrders() {
        const currentDate = new Date();
        const orders = await this.ordersRepository.find({
            relations: ['orderDetails']
        });
        const ordersFiltered = orders.filter((order) => {
            const orderDate = new Date(order.date);
            const differenceInTime = currentDate.getTime() - orderDate.getTime();
            const hoursDifference = differenceInTime / (1000 * 3600);
            if (hoursDifference > 24 && order.status === status_enum_1.statusOrder.pending) {
                order.status = status_enum_1.statusOrder.completed;
                this.ordersRepository.save(order);
            }
            return order;
        });
        return ordersFiltered;
    }
    async createOrder(userId, products) {
        return await this.dataSource.transaction(async (manager) => {
            const user = await manager.findOne(users_entity_1.Users, { where: { id: userId } });
            if (!user) {
                throw new common_1.NotFoundException(`User with id ${userId} not found`);
            }
            const order = new orders_entity_1.Orders();
            order.date = new Date();
            order.user = user;
            const newOrder = await manager.save(order);
            const orderDetails = new orderDetails_entity_1.OrderDetails();
            orderDetails.order = newOrder;
            let totalPrice = 0;
            const OrderProducts = [];
            let membershipPurchased = null;
            for (const { productId, quantity } of products) {
                const product = await manager.findOne(products_entity_1.Products, {
                    where: { id: productId },
                    relations: ['category'],
                });
                if (!product || product.stock < quantity) {
                    throw new common_1.NotFoundException(`Product with id ${productId} is unavailable`);
                }
                const orderProduct = new orderProduct_entity_1.OrderProduct();
                orderProduct.product = product;
                orderProduct.quantity = quantity;
                orderProduct.orderDetails = orderDetails;
                orderProduct.price = Number(product.price) * quantity;
                totalPrice += orderProduct.price;
                product.stock -= quantity;
                await manager.save(product);
                OrderProducts.push(orderProduct);
                if (product.category.name.toLowerCase() === 'memberships') {
                    membershipPurchased = product.name.toLowerCase();
                }
            }
            orderDetails.totalPrice = totalPrice;
            orderDetails.orderProducts = OrderProducts;
            await manager.save(orderDetails);
            newOrder.orderDetails = orderDetails;
            if (membershipPurchased && user.rol !== userRoles_enum_1.userRoles.member) {
                user.rol = userRoles_enum_1.userRoles.member;
                user.membershipExpiresAt = this.membershipService.calculateMembershipExpiration(membershipPurchased);
                await manager.save(user);
                await this.emailService.sendMembershipConfirmationEmail(user.email, {
                    user: user,
                    product: {
                        name: membershipPurchased,
                    },
                    expirationDate: user.membershipExpiresAt.toISOString().split('T')[0],
                });
            }
            await manager.save(newOrder);
            await this.emailService.sendOrderConfirmationEmail(user.email, {
                user: user,
                date: newOrder.date,
                orderDetails,
                totalPrice,
                products: OrderProducts.map((orderProduct) => ({
                    name: orderProduct.product.name,
                    quantity: orderProduct.quantity,
                    price: orderProduct.price,
                })),
            });
            return manager.findOne(orders_entity_1.Orders, { where: { id: newOrder.id }, relations: ['orderDetails'] });
        });
    }
    async getOrdersByUser(userId) {
        const orders = await this.ordersRepository.find({
            where: { user: { id: userId } },
            relations: ['orderDetails']
        });
        const currentDate = new Date();
        const ordersFiltered = orders.filter((order) => {
            const orderDate = new Date(order.date);
            const differenceInTime = currentDate.getTime() - orderDate.getTime();
            const hoursDifference = differenceInTime / (1000 * 3600);
            if (hoursDifference > 24 && order.status === status_enum_1.statusOrder.pending) {
                order.status = status_enum_1.statusOrder.completed;
                this.ordersRepository.save(order);
            }
            return order;
        });
        return ordersFiltered;
    }
    async getOrder(id) {
        const order = await this.ordersRepository.findOne({
            where: { id },
            relations: ['orderDetails']
        });
        if (!order) {
            throw new common_1.NotFoundException(`Order with id ${id} was not found`);
        }
        return order;
    }
    async deleteOrder(orderId) {
        const order = await this.ordersRepository.findOne({
            where: { id: orderId },
            relations: ['orderDetails', 'user']
        });
        if (!order) {
            throw new common_1.NotFoundException(`Order with id ${orderId} was not found`);
        }
        const currentDate = new Date();
        const orderDate = new Date(order.date);
        const differenceInTime = currentDate.getTime() - orderDate.getTime();
        const hoursDifference = differenceInTime / (1000 * 3600);
        if (hoursDifference > 24) {
            throw new common_1.BadRequestException('You can only cancel orders within the first 24 hours');
        }
        order.status = status_enum_1.statusOrder.cancelled;
        await this.ordersRepository.save(order);
        const orderDetails = {
            user: {
                name: order.user.name,
                email: order.user.email,
            },
            totalPrice: order.orderDetails.totalPrice,
        };
        await this.emailService.sendOrderCancellationEmail(orderDetails.user.email, orderDetails);
        return order;
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(orders_entity_1.Orders)),
    __param(2, (0, typeorm_1.InjectRepository)(users_entity_1.Users)),
    __param(3, (0, typeorm_1.InjectRepository)(orderDetails_entity_1.OrderDetails)),
    __param(4, (0, typeorm_1.InjectRepository)(products_entity_1.Products)),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        email_service_1.EmailService,
        membership_service_1.MembershipService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map