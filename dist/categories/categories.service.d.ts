import { Categories } from 'src/entities/categories.entity';
import { Repository } from 'typeorm';
export declare class CategoriesService {
    private categoriesRepository;
    constructor(categoriesRepository: Repository<Categories>);
    addCategories(): Promise<string>;
    getCategories(): Promise<Categories[]>;
}
