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
exports.ReviewsProducts = void 0;
const typeorm_1 = require("typeorm");
const users_entity_1 = require("./users.entity");
const products_entity_1 = require("./products.entity");
const class_transformer_1 = require("class-transformer");
const uuid_1 = require("uuid");
let ReviewsProducts = class ReviewsProducts {
    constructor() {
        this.id = (0, uuid_1.v4)();
    }
};
exports.ReviewsProducts = ReviewsProducts;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ReviewsProducts.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], ReviewsProducts.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], ReviewsProducts.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.Users, (user) => user.reviews),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", users_entity_1.Users)
], ReviewsProducts.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => products_entity_1.Products, (product) => product.reviews),
    (0, typeorm_1.JoinColumn)(),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", products_entity_1.Products)
], ReviewsProducts.prototype, "productId", void 0);
exports.ReviewsProducts = ReviewsProducts = __decorate([
    (0, typeorm_1.Entity)({ name: 'ReviewsProducts' })
], ReviewsProducts);
//# sourceMappingURL=reviewsProducts.entity.js.map