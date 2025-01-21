"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const db_config_1 = require("./config/db.config");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const user_module_1 = require("./users/user.module");
const gyms_module_1 = require("./gyms/gyms.module");
const products_module_1 = require("./products/products.module");
const categories_module_1 = require("./categories/categories.module");
const orders_module_1 = require("./orders/orders.module");
const auth_users_module_1 = require("./auth/auth-user/auth-users.module");
const auth_gyms_module_1 = require("./auth/auth-gyms/auth-gyms.module");
const classes_module_1 = require("./classes/classes.module");
const jwt_1 = require("@nestjs/jwt");
const stripe_module_1 = require("./stripe/stripe.module");
const email_module_1 = require("./email/email.module");
const notifications_module_1 = require("./notifications/notifications.module");
const schedule_1 = require("@nestjs/schedule");
const appointments_module_1 = require("./appointments/appointments.module");
const membership_module_1 = require("./membership/membership.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            categories_module_1.CategoriesModule,
            gyms_module_1.GymsModule,
            user_module_1.UserModule,
            products_module_1.ProductsModule,
            orders_module_1.OrdersModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [db_config_1.default],
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (config) => config.get('typeorm'),
            }),
            jwt_1.JwtModule.register({
                global: true,
                signOptions: { expiresIn: '1d' },
                secret: process.env.JWT_SECRET,
            }),
            schedule_1.ScheduleModule.forRoot(),
            auth_gyms_module_1.AuthGymsModule,
            auth_users_module_1.AuthUsersModule,
            classes_module_1.ClassesModule,
            stripe_module_1.StripeModule,
            email_module_1.EmailModule,
            notifications_module_1.NotificationsModule,
            appointments_module_1.AppointmentsModule,
            membership_module_1.MembershipModule
        ]
    })
], AppModule);
//# sourceMappingURL=app.module.js.map