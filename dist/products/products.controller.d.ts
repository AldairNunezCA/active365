import { ProductsService } from './products.service';
import { Products } from 'src/entities/products.entity';
import { CreateProductDto } from 'src/dto/createProduct.dto';
import { ProductReviewDto } from 'src/dto/review-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    getProducts(category?: string, subcategory?: string, search?: string): Promise<{
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
    createProduct(product: Partial<CreateProductDto>, file?: Express.Multer.File): Promise<Products[]>;
    addReview(review: ProductReviewDto): Promise<{
        message: string;
    }>;
    updateProduct(id: string, product: Partial<Products>, file?: Express.Multer.File): Promise<Products>;
    getProductsByCategory(categoryId: string): Promise<Products[]>;
    toggleProductStatus(productId: string): Promise<{
        message: string;
    }>;
}
