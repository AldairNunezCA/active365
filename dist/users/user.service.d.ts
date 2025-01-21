import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { Gyms } from 'src/entities/gyms.entity';
import { ReviewsGyms } from 'src/entities/reviewsGyms.entity';
import { FilesUploadService } from 'src/files-upload/files-upload.service';
export declare class UserService {
    private readonly userRepository;
    private readonly gymsRepository;
    private readonly reviewsRepository;
    private readonly filesUploadService;
    constructor(userRepository: Repository<Users>, gymsRepository: Repository<Gyms>, reviewsRepository: Repository<ReviewsGyms>, filesUploadService: FilesUploadService);
    getAllUsers(page: number, limit: number): Promise<Users[]>;
    getUserById(id: string): Promise<Users>;
    updateUser(id: string, user: Partial<Users>, file?: Express.Multer.File): Promise<string>;
    private waitForGyms;
    onModuleInit(): Promise<string>;
    toggleUserStatus(userId: string): Promise<{
        message: string;
    }>;
    setAdmin(userId: string): Promise<{
        message: string;
    }>;
}
