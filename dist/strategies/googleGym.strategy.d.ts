import { ConfigType } from "@nestjs/config";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { AuthGymsService } from "src/auth/auth-gyms/auth-gyms.service";
import googleOauthConfig from "src/config/googleOauth.config";
declare const GoogleStrategyForGyms_base: new (...args: any[]) => Strategy;
export declare class GoogleStrategyForGyms extends GoogleStrategyForGyms_base {
    private googleConfiguration;
    private authGymsService;
    constructor(googleConfiguration: ConfigType<typeof googleOauthConfig>, authGymsService: AuthGymsService);
    validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<void>;
}
export {};
