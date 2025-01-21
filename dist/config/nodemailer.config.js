"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodemailerConfig = void 0;
const dotenv_1 = require("dotenv");
const nodemailer = require("nodemailer");
(0, dotenv_1.config)({ path: '.env.development' });
exports.nodemailerConfig = {
    provide: 'NODEMAILER',
    useFactory: async () => {
        try {
            const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: parseInt(process.env.SMTP_PORT || '587'),
                secure: process.env.SMTP_SECURE === 'true',
                auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASSWORD,
                },
            });
            transporter.verify((error, success) => {
                if (error) {
                    console.error('Nodemailer connection error:', error);
                }
                else {
                    console.log('Nodemailer connection successful:', success);
                }
            });
            return transporter;
        }
        catch (error) {
            console.error('Failed to create SMTP transport:', error);
            throw error;
        }
    },
};
//# sourceMappingURL=nodemailer.config.js.map