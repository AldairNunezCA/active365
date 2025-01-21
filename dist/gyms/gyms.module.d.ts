import { OnModuleInit } from '@nestjs/common';
import { GymsService } from './gyms.service';
export declare class GymsModule implements OnModuleInit {
    private readonly gymsService;
    constructor(gymsService: GymsService);
    onModuleInit(): Promise<void>;
}
