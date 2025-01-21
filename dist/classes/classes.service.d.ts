import { CreateClassDto } from 'src/dto/create-class.dto';
import { Classes } from 'src/entities/class.entity';
import { Gyms } from 'src/entities/gyms.entity';
import { FilesUploadService } from 'src/files-upload/files-upload.service';
import { DataSource, Repository } from 'typeorm';
export declare class ClassesService {
    private dataSource;
    private classesRepository;
    private gymsRepository;
    private filesUploadService;
    constructor(dataSource: DataSource, classesRepository: Repository<Classes>, gymsRepository: Repository<Gyms>, filesUploadService: FilesUploadService);
    classesSeeder(): Promise<string>;
    getClasses(): Promise<Classes[]>;
    getClassesById(id: string): Promise<Classes>;
    getClassesByGymId(gymId: string): Promise<Classes[]>;
    getClassesByGymName(name: string): Promise<Classes[]>;
    addClasses(name: string, description: string, capacity: number, duration: number, date: Date, time: string, gymId: string, file?: Express.Multer.File): Promise<string>;
    updateClasses(id: string, classes?: Partial<CreateClassDto>, file?: Express.Multer.File): Promise<Classes>;
    cancelClass(id: string): Promise<string>;
}
