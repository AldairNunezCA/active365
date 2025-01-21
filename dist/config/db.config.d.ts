import { DataSource } from 'typeorm';
declare const _default: (() => {
    type: string;
    database: string;
    host: string;
    port: number;
    username: string;
    password: string;
    ssl: boolean;
    extra: {
        ssl: {
            rejectUnauthorized: boolean;
        };
    };
    entities: string[];
    migrations: string[];
    autoLoadEntities: boolean;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    type: string;
    database: string;
    host: string;
    port: number;
    username: string;
    password: string;
    ssl: boolean;
    extra: {
        ssl: {
            rejectUnauthorized: boolean;
        };
    };
    entities: string[];
    migrations: string[];
    autoLoadEntities: boolean;
}>;
export default _default;
export declare const connectionSource: DataSource;
