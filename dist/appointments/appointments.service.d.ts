import { Appointments } from 'src/entities/appointments.entity';
import { Classes } from 'src/entities/class.entity';
import { Users } from 'src/entities/users.entity';
import { DataSource, Repository } from 'typeorm';
import { EmailService } from 'src/email/email.service';
export declare class AppointmentsService {
    private dataSource;
    private readonly appointmentsRepository;
    private readonly classesRepository;
    private readonly usersRepository;
    private readonly emailService;
    constructor(dataSource: DataSource, appointmentsRepository: Repository<Appointments>, classesRepository: Repository<Classes>, usersRepository: Repository<Users>, emailService: EmailService);
    createAppointment(userId: string, classId: string): Promise<any>;
    cancelAppointment(appointmentId: string): Promise<any>;
    modifyAppointment(appointmentId: string, newClassId: string): Promise<any>;
}
