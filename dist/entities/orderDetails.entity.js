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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderDetails = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const orders_entity_1 = require("./orders.entity");
const orderProduct_entity_1 = require("./orderProduct.entity");
let OrderDetails = class OrderDetails {
    constructor() {
        this.id = (0, uuid_1.v4)();
    }
};
exports.OrderDetails = OrderDetails;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], OrderDetails.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: false }),
    __metadata("design:type", Number)
], OrderDetails.prototype, "totalPrice", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => orders_entity_1.Orders, (order) => order.orderDetails, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", orders_entity_1.Orders)
], OrderDetails.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => orderProduct_entity_1.OrderProduct, (orderProduct) => orderProduct.orderDetails, { cascade: true }),
    __metadata("design:type", Array)
], OrderDetails.prototype, "orderProducts", void 0);
exports.OrderDetails = OrderDetails = __decorate([
    (0, typeorm_1.Entity)({ name: 'OrderDetails' })
], OrderDetails);
//# sourceMappingURL=orderDetails.entity.js.map