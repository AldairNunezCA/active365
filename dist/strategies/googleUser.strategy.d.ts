import { ConfigType } from "@nestjs/config";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { AuthUsersService } from "src/auth/auth-user/auth-users.service";
import googleOauthConfig from "src/config/googleOauth.config";
declare const GoogleStrategyForUsers_base: new (...args: any[]) => Strategy;
export declare class GoogleStrategyForUsers extends GoogleStrategyForUsers_base {
    private googleConfiguration;
    private authUsersService;
    constructor(googleConfiguration: ConfigType<typeof googleOauthConfig>, authUsersService: AuthUsersService);
    validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<void>;
}
export {};
