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
exports.ProductsModule = void 0;
const common_1 = require("@nestjs/common");
const products_service_1 = require("./products.service");
const products_controller_1 = require("./products.controller");
const typeorm_1 = require("@nestjs/typeorm");
const products_entity_1 = require("../entities/products.entity");
const categories_entity_1 = require("../entities/categories.entity");
const files_upload_module_1 = require("../files-upload/files-upload.module");
const users_entity_1 = require("../entities/users.entity");
const reviewsProducts_entity_1 = require("../entities/reviewsProducts.entity");
let ProductsModule = class ProductsModule {
    constructor(productsService) {
        this.productsService = productsService;
    }
    async onModuleInit() {
    }
};
exports.ProductsModule = ProductsModule;
exports.ProductsModule = ProductsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([categories_entity_1.Categories]),
            typeorm_1.TypeOrmModule.forFeature([products_entity_1.Products]),
            typeorm_1.TypeOrmModule.forFeature([users_entity_1.Users]),
            typeorm_1.TypeOrmModule.forFeature([reviewsProducts_entity_1.ReviewsProducts]),
            files_upload_module_1.FilesUploadModule
        ],
        controllers: [products_controller_1.ProductsController],
        providers: [products_service_1.ProductsService],
        exports: [products_service_1.ProductsService, typeorm_1.TypeOrmModule]
    }),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsModule);
//# sourceMappingURL=products.module.js.map