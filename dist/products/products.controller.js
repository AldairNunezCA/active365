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
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const products_service_1 = require("./products.service");
const platform_express_1 = require("@nestjs/platform-express");
const file_validation_pipe_1 = require("../files-upload/file-validation.pipe");
const review_product_dto_1 = require("../dto/review-product.dto");
const roles_decorator_1 = require("../decorators/roles.decorator");
const userRoles_enum_1 = require("../enums/userRoles.enum");
const authorization_guard_1 = require("../auth/guards/authorization.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
let ProductsController = class ProductsController {
    constructor(productsService) {
        this.productsService = productsService;
    }
    getProducts(category, subcategory, search) {
        const filterDto = { category, subcategory, search };
        return this.productsService.getProducts(filterDto);
    }
    getProductById(id) {
        return this.productsService.getProductById(id);
    }
    createProduct(product, file) {
        return this.productsService.createProduct(product, file);
    }
    addReview(review) {
        return this.productsService.addReview(review);
    }
    updateProduct(id, product, file) {
        return this.productsService.updateProduct(id, product, file);
    }
    getProductsByCategory(categoryId) {
        return this.productsService.getProductsByCategory(categoryId);
    }
    toggleProductStatus(productId) {
        return this.productsService.toggleProductStatus(productId);
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('category')),
    __param(1, (0, common_1.Query)('subcategory')),
    __param(2, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "getProducts", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "getProductById", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Rol)(userRoles_enum_1.userRoles.admin, userRoles_enum_1.userRoles.partner),
    (0, common_1.UseGuards)(authorization_guard_1.AuthorizationGuard, roles_guard_1.RolesGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)(file_validation_pipe_1.ValidateImagesPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "createProduct", null);
__decorate([
    (0, common_1.Post)('review'),
    (0, roles_decorator_1.Rol)(userRoles_enum_1.userRoles.registered, userRoles_enum_1.userRoles.member),
    (0, common_1.UseGuards)(authorization_guard_1.AuthorizationGuard, roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [review_product_dto_1.ProductReviewDto]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "addReview", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Rol)(userRoles_enum_1.userRoles.admin, userRoles_enum_1.userRoles.partner),
    (0, common_1.UseGuards)(authorization_guard_1.AuthorizationGuard, roles_guard_1.RolesGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)(file_validation_pipe_1.ValidateImagesPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "updateProduct", null);
__decorate([
    (0, common_1.Get)('category/:categoryId'),
    __param(0, (0, common_1.Param)('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "getProductsByCategory", null);
__decorate([
    (0, common_1.Put)('/toggle-status/:id'),
    (0, roles_decorator_1.Rol)(userRoles_enum_1.userRoles.admin, userRoles_enum_1.userRoles.partner),
    (0, common_1.UseGuards)(authorization_guard_1.AuthorizationGuard, roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "toggleProductStatus", null);
exports.ProductsController = ProductsController = __decorate([
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsController);
//# sourceMappingURL=products.controller.js.map