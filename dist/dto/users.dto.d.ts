export declare class CreateUserDto {
    name: string;
    email: string;
    phone?: number;
    address?: string;
    city?: string;
    password: string;
    height?: number;
    weight?: number;
}
declare const UpdateUserDto_base: import("@nestjs/common").Type<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
}
export declare class LoginUserDto {
    email: string;
    password: string;
}
export {};
