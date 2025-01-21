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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const data = require("../seeders/products.json");
const typeorm_1 = require("@nestjs/typeorm");
const categories_entity_1 = require("../entities/categories.entity");
const products_entity_1 = require("../entities/products.entity");
const typeorm_2 = require("typeorm");
const files_upload_service_1 = require("../files-upload/files-upload.service");
const reviewsProducts_entity_1 = require("../entities/reviewsProducts.entity");
const users_entity_1 = require("../entities/users.entity");
const status_enum_1 = require("../enums/status.enum");
const categories_service_1 = require("../categories/categories.service");
let ProductsService = class ProductsService {
    constructor(categoriesRepository, productsRepository, usersRepository, reviewsRepository, filesUploadService) {
        this.categoriesRepository = categoriesRepository;
        this.productsRepository = productsRepository;
        this.usersRepository = usersRepository;
        this.reviewsRepository = reviewsRepository;
        this.filesUploadService = filesUploadService;
    }
    async waitForCategories() {
        const pollInterval = 500;
        const timeout = 20000;
        let elapsedTime = 0;
        while (elapsedTime < timeout) {
            const categoriesCount = await this.categoriesRepository.count();
            if (categoriesCount > 0) {
                return;
            }
            await new Promise((resolve) => setTimeout(resolve, pollInterval));
            elapsedTime += pollInterval;
        }
        throw new Error('Timeout: Categories were not initialized in time.');
    }
    async onModuleInit() {
        const categoriesCount = await this.categoriesRepository.count();
        if (categoriesCount === 0) {
            console.log('No categories found, initializing categories...');
            const categoriesService = new categories_service_1.CategoriesService(this.categoriesRepository);
            await categoriesService.addCategories();
        }
        await this.waitForCategories();
        const categories = await this.categoriesRepository.find();
        if (categories.length === 0) {
            throw new Error('No se encontraron categorías para asociar los productos');
        }
        for (const element of data) {
            const category = categories.find((category) => category.name === element.category);
            if (!category) {
                console.warn(`Categoría no encontrada para el producto ${element.name}`);
                continue;
            }
            const product = new products_entity_1.Products();
            product.name = element.name;
            product.description = element.description;
            product.imgUrl = element.imgUrl;
            product.price = element.price;
            product.stock = element.stock;
            product.category = category;
            product.subcategory = element.subcategory;
            await this.productsRepository
                .createQueryBuilder()
                .insert()
                .into(products_entity_1.Products)
                .values(product)
                .orUpdate(['description', 'price', 'stock', 'subcategory'], ['name'])
                .execute();
        }
        return "Products added";
    }
    async getProducts(filterDto) {
        const { category, subcategory } = filterDto || {};
        const query = this.productsRepository.createQueryBuilder('product');
        query
            .leftJoinAndSelect('product.category', 'category')
            .leftJoinAndSelect('product.reviews', 'reviews')
            .groupBy('product.id')
            .addGroupBy('category.name');
        if (category) {
            query.andWhere('category.name = :category', { category });
        }
        if (subcategory) {
            query.andWhere('product.subcategory = :subcategory', { subcategory });
        }
        query.select([
            'product.id',
            'product.name',
            'product.description',
            'product.price',
            'product.stock',
            'product.imgUrl',
            'product.subcategory',
            'category.name',
            'product.status',
            'AVG(reviews.rating) as rating',
        ]);
        const products = await query.getRawMany();
        if (products.length === 0) {
            throw new common_1.NotFoundException('No products were found matching the criteria.');
        }
        const mappedProducts = products.map(product => ({
            id: product.product_id,
            name: product.product_name,
            description: product.product_description,
            price: product.product_price,
            stock: product.product_stock,
            imgUrl: product.product_imgUrl,
            subcategory: product.product_subcategory,
            category: { name: product.category_name },
            status: product.product_status,
            rating: parseFloat(parseFloat(product.rating).toFixed(2)),
        }));
        return mappedProducts;
    }
    async getProductById(id) {
        const product = await this.productsRepository.findOne({
            where: { id: id },
            relations: ['category', 'reviews'],
            select: [
                'id', 'name', 'description', 'price', 'stock', 'imgUrl', 'category', 'subcategory', 'reviews', 'status'
            ]
        });
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found..`);
        }
        product.reviews = product.reviews.map(review => ({
            ...review,
            rating: typeof review.rating === 'string' ? parseFloat(review.rating) : review.rating
        }));
        return product;
    }
    async createProduct(product, file) {
        const categoryFound = await this.categoriesRepository.findOne({
            where: { name: product.category }
        });
        if (!categoryFound) {
            throw new common_1.NotFoundException(`Category with name "${product.category}" not found.`);
        }
        let image = 'https://example.com/default-image.jpg';
        if (file) {
            const uploadImage = await this.filesUploadService.uploadImage(file);
            image = uploadImage.secure_url;
        }
        const newProduct = this.productsRepository.create({
            ...product,
            category: categoryFound,
            imgUrl: image
        });
        return await this.productsRepository.save(newProduct);
    }
    async updateProduct(id, product, file) {
        const productUpdate = await this.productsRepository.findOne({
            where: { id },
            relations: ['category']
        });
        if (!productUpdate) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found.`);
        }
        if (product.category) {
            const categoryFound = await this.categoriesRepository.findOne({
                where: { name: product.category },
            });
            if (!categoryFound) {
                throw new common_1.NotFoundException(`Category with name "${product.category}" not found.`);
            }
            productUpdate.category = categoryFound;
        }
        if (file) {
            const uploadImage = await this.filesUploadService.uploadImage(file);
            productUpdate.imgUrl = uploadImage.secure_url;
        }
        Object.assign(productUpdate, { ...product, category: productUpdate.category });
        return await this.productsRepository.save(productUpdate);
    }
    async getProductsByCategory(categoryId) {
        const products = await this.productsRepository.find({
            where: { category: { id: categoryId } },
            relations: ['category'],
            select: ['id', 'name', 'description', 'price', 'stock', 'imgUrl', 'category', 'subcategory', 'status']
        });
        if (products.length === 0) {
            throw new common_1.NotFoundException(`No products found for category with ID ${categoryId}.`);
        }
        return products;
    }
    async addReview(review) {
        const product = await this.productsRepository.findOne({
            where: { id: review.productId },
            relations: ['reviews', 'reviews.userId']
        });
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${review.productId} not found.`);
        }
        const user = await this.usersRepository.findOne({
            where: { id: review.userId },
            relations: ['orders', 'orders.orderDetails', 'orders.orderDetails.orderProducts', 'orders.orderDetails.orderProducts.product']
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${review.userId} not found.`);
        }
        const hasPurchasedProduct = user.orders.some(order => order.orderDetails.orderProducts.some(orderProduct => orderProduct.product && orderProduct.product.id === review.productId));
        if (!hasPurchasedProduct) {
            throw new common_1.ForbiddenException(`The user has not purchased this product to make a review.`);
        }
        const existingReview = product.reviews.find(rev => rev.userId.id === review.userId);
        if (existingReview) {
            existingReview.rating = review.rating;
            existingReview.comment = review.comment;
            await this.reviewsRepository.save(existingReview);
            return {
                message: `Review update done.`,
            };
        }
        else {
            const newReview = new reviewsProducts_entity_1.ReviewsProducts();
            newReview.productId = product;
            newReview.userId = user;
            newReview.rating = review.rating;
            newReview.comment = review.comment;
            await this.reviewsRepository.save(newReview);
            product.reviews.push(newReview);
            await this.productsRepository.save(product);
            return {
                message: `Review done.`,
            };
        }
    }
    async getRandomProducts(limit) {
        return this.productsRepository
            .createQueryBuilder('product')
            .orderBy('RANDOM()')
            .limit(limit)
            .getMany();
    }
    async toggleProductStatus(productId) {
        const product = await this.productsRepository.findOne({ where: { id: productId } });
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${productId} not found.`);
        }
        if (product.status === status_enum_1.statusProduct.active) {
            product.status = status_enum_1.statusProduct.inactive;
        }
        else if (product.status === status_enum_1.statusProduct.inactive) {
            product.status = status_enum_1.statusProduct.active;
        }
        else {
            throw new Error('Unexpected product status.');
        }
        await this.productsRepository.save(product);
        return { message: `Product with ID ${productId} has been ${product.status === status_enum_1.statusProduct.active ? 'activated' : 'deactivated'} successfully.` };
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(categories_entity_1.Categories)),
    __param(1, (0, typeorm_1.InjectRepository)(products_entity_1.Products)),
    __param(2, (0, typeorm_1.InjectRepository)(users_entity_1.Users)),
    __param(3, (0, typeorm_1.InjectRepository)(reviewsProducts_entity_1.ReviewsProducts)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        files_upload_service_1.FilesUploadService])
], ProductsService);
//# sourceMappingURL=products.service.js.map