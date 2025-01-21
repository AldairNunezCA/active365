import { Categories } from 'src/entities/categories.entity';
import { Products } from 'src/entities/products.entity';
import { Repository } from 'typeorm';
import { FilesUploadService } from 'src/files-upload/files-upload.service';
import { FilterProductsDto } from 'src/dto/createProduct.dto';
import { ReviewsProducts } from 'src/entities/reviewsProducts.entity';
import { Users } from 'src/entities/users.entity';
import { ProductReviewDto } from 'src/dto/review-product.dto';
export declare class ProductsService {
    private categoriesRepository;
    private productsRepository;
    private usersRepository;
    private reviewsRepository;
    private readonly filesUploadService;
    constructor(categoriesRepository: Repository<Categories>, productsRepository: Repository<Products>, usersRepository: Repository<Users>, reviewsRepository: Repository<ReviewsProducts>, filesUploadService: FilesUploadService);
    private waitForCategories;
    onModuleInit(): Promise<string>;
    getProducts(filterDto?: FilterProductsDto): Promise<{
        id: any;
        name: any;
        description: any;
        price: any;
        stock: any;
        imgUrl: any;
        subcategory: any;
        category: {
            name: any;
        };
        status: any;
        rating: number;
    }[]>;
    getProductById(id: string): Promise<Products>;
    createProduct(product: any, file: Express.Multer.File): Promise<Products[]>;
    updateProduct(id: string, product: any, file?: Express.Multer.File): Promise<Products>;
    getProductsByCategory(categoryId: string): Promise<Products[]>;
    addReview(review: ProductReviewDto): Promise<{
        message: string;
    }>;
    getRandomProducts(limit: number): Promise<Products[]>;
    toggleProductStatus(productId: string): Promise<{
        message: string;
    }>;
}
