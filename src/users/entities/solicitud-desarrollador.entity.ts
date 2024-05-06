import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { User } from "./user.entity";

export enum EstadoSolicitud {
    Pendiente = 'Pendiente',
    Aceptada = 'Aceptada',
    Rechazada = 'Rechazada',
}

@Entity('solicitudes-desarrollador')
export class SolicitudDesarrollador {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    mensaje: string;

    @OneToOne(() => User, user => user.id)
    @JoinColumn()
    user: User;

    @Column({ type: 'enum', enum: EstadoSolicitud, default: EstadoSolicitud.Pendiente })
    estado: EstadoSolicitud;
}