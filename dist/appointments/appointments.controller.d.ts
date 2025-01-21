import { AppointmentsService } from './appointments.service';
import { Appointments } from 'src/entities/appointments.entity';
import { CreateAppointmentDto } from 'src/dto/create-appointment.dto';
export declare class AppointmentsController {
    private readonly appointmentsService;
    constructor(appointmentsService: AppointmentsService);
    createAppointment(createAppointmentDto: CreateAppointmentDto): Promise<Appointments>;
    cancelAppointment(appointmentId: string): Promise<any>;
    modifyAppointment(appointmentId: string, newClassId: string): Promise<any>;
}
