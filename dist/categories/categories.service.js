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
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const categories_entity_1 = require("../entities/categories.entity");
const typeorm_2 = require("typeorm");
const data = require("../seeders/products.json");
let CategoriesService = class CategoriesService {
    constructor(categoriesRepository) {
        this.categoriesRepository = categoriesRepository;
    }
    async addCategories() {
        const promises = data.map(async (product) => {
            const result = await this.categoriesRepository
                .createQueryBuilder()
                .insert()
                .into(categories_entity_1.Categories)
                .values({ name: product.category })
                .onConflict(`("name") DO NOTHING`)
                .execute();
            await this.categoriesRepository
                .createQueryBuilder()
                .insert()
                .into(categories_entity_1.Categories)
                .values({ name: 'other' })
                .onConflict(`("name") DO NOTHING`)
                .execute();
        });
        await Promise.all(promises);
        return `Categories added`;
    }
    async getCategories() {
        const categories = await this.categoriesRepository.find();
        if (categories.length === 0) {
            throw new common_1.NotFoundException('No categories were found in the database.');
        }
        return categories;
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(categories_entity_1.Categories)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map