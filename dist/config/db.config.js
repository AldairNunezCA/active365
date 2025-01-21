"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionSource = void 0;
const config_1 = require("@nestjs/config");
const dotenv_1 = require("dotenv");
const typeorm_1 = require("typeorm");
(0, dotenv_1.config)({ path: '.env' });
const config = {
    type: 'postgres',
    database: `${process.env.DB_NAME}`,
    host: `${process.env.DB_HOST}`,
    port: +process.env.DB_PORT,
    username: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASSWORD}`,
    "ssl": true,
    "extra": {
        "ssl": {
            "rejectUnauthorized": false
        }
    },
    entities: [`dist/**/*.entity{.ts,.js}`],
    migrations: [`dist/**/migrations/*{.ts,.js}`],
    autoLoadEntities: true,
};
exports.default = (0, config_1.registerAs)('typeorm', () => config);
exports.connectionSource = new typeorm_1.DataSource(config);
//# sourceMappingURL=db.config.js.map