import { Appointments } from './appointments.entity';
import { Gyms } from './gyms.entity';
import { statusClass } from 'src/enums/status.enum';
export declare class Classes {
    id: string;
    name: string;
    description: string;
    capacity: number;
    duration: number;
    imgUrl: string;
    date: Date;
    status: statusClass;
    time: string;
    gym: Gyms;
    appointments: Appointments[];
}
