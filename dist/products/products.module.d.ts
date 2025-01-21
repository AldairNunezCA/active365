import { OnModuleInit } from '@nestjs/common';
import { ProductsService } from './products.service';
export declare class ProductsModule implements OnModuleInit {
    private readonly productsService;
    constructor(productsService: ProductsService);
    onModuleInit(): Promise<void>;
}
