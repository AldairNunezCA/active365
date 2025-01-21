import { ClassesService } from './classes.service';
import { CreateClassDto } from 'src/dto/create-class.dto';
export declare class ClassesController {
    private readonly classesService;
    constructor(classesService: ClassesService);
    getClassesByGymId(gymId: string): Promise<import("../entities/class.entity").Classes[]>;
    getClasses(): Promise<import("../entities/class.entity").Classes[]>;
    getClasssesByGymName(name: string): Promise<import("../entities/class.entity").Classes[]>;
    cancelClass(id: string): Promise<string>;
    getClassesById(id: string): Promise<import("../entities/class.entity").Classes>;
    addClasses(classes: CreateClassDto, file?: Express.Multer.File): Promise<string>;
    updateClasses(id: string, classes: Partial<CreateClassDto>, file?: Express.Multer.File): Promise<import("../entities/class.entity").Classes>;
}
