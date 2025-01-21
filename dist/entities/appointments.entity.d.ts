import { statusAppointment } from "src/enums/statusAppointments.enum";
import { Classes } from "./class.entity";
import { Users } from "./users.entity";
export declare class Appointments {
    id: string;
    status: statusAppointment;
    date: Date;
    time: string;
    createdAt: Date;
    user: Users;
    classes: Classes;
}
