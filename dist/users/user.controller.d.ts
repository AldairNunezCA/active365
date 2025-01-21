import { UserService } from './user.service';
import { Users } from 'src/entities/users.entity';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUsers(page: number, limit: number): Promise<Users[]>;
    getUserById(id: string): Promise<Users>;
    updateUser(id: string, user: Partial<Users>, file?: Express.Multer.File): Promise<string>;
    toggleUserStatus(userId: string): Promise<{
        message: string;
    }>;
    setAdmin(userId: string): Promise<{
        message: string;
    }>;
}
