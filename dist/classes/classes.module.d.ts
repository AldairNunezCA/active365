import { OnModuleInit } from '@nestjs/common';
import { ClassesService } from './classes.service';
export declare class ClassesModule implements OnModuleInit {
    private readonly classesService;
    constructor(classesService: ClassesService);
    onModuleInit(): Promise<void>;
}
