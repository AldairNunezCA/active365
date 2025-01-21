export declare class CreateProductDto {
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    imgUrl: string;
    subcategory: string;
}
export declare class FilterProductsDto {
    category?: string;
    subcategory?: string;
}
