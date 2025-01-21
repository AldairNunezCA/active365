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
exports.Categories = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const products_entity_1 = require("./products.entity");
let Categories = class Categories {
    constructor() {
        this.id = (0, uuid_1.v4)();
    }
};
exports.Categories = Categories;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Categories.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, unique: true, nullable: false }),
    __metadata("design:type", String)
], Categories.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => products_entity_1.Products, (product) => product.category),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], Categories.prototype, "product", void 0);
exports.Categories = Categories = __decorate([
    (0, typeorm_1.Entity)({ name: 'Categories' })
], Categories);
//# sourceMappingURL=categories.entity.js.map