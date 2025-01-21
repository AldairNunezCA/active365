import * as nodemailer from 'nodemailer';
export declare const nodemailerConfig: {
    provide: string;
    useFactory: () => Promise<nodemailer.Transporter<import("nodemailer/lib/smtp-transport").SentMessageInfo, import("nodemailer/lib/smtp-transport").Options>>;
};
