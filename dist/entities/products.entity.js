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
exports.Products = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const categories_entity_1 = require("./categories.entity");
const orderProduct_entity_1 = require("./orderProduct.entity");
const reviewsProducts_entity_1 = require("./reviewsProducts.entity");
const status_enum_1 = require("../enums/status.enum");
let Products = class Products {
    constructor() {
        this.id = (0, uuid_1.v4)();
    }
};
exports.Products = Products;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Products.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, unique: true, nullable: false }),
    __metadata("design:type", String)
], Products.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: false }),
    __metadata("design:type", String)
], Products.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Products.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], Products.prototype, "stock", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: false, default: 'https://example.com/default-image.jpg' }),
    __metadata("design:type", String)
], Products.prototype, "imgUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 10, nullable: false, default: status_enum_1.statusProduct.active }),
    __metadata("design:type", String)
], Products.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => categories_entity_1.Categories, (category) => category.product),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", categories_entity_1.Categories)
], Products.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => orderProduct_entity_1.OrderProduct, (orderProduct) => orderProduct.product),
    __metadata("design:type", Array)
], Products.prototype, "orderProducts", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Products.prototype, "subcategory", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reviewsProducts_entity_1.ReviewsProducts, (review) => review.productId, { eager: true }),
    __metadata("design:type", Array)
], Products.prototype, "reviews", void 0);
exports.Products = Products = __decorate([
    (0, typeorm_1.Entity)({ name: "Products" })
], Products);
//# sourceMappingURL=products.entity.js.map