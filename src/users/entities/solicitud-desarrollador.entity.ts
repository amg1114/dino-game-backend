import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { User } from "./user.entity";

export enum EstadoSolicitud {
    Pendiente = 0,
    Aceptada = 1,
    Rechazada = 2,
}

@Entity('solicitudes-desarrollador')
export class SolicitudDesarrollador {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    mensaje: string;

    @OneToOne(() => User, user => user.id, { onDelete: "CASCADE" })
    @JoinColumn()
    user: User;

    @Column({ type: 'enum', enum: EstadoSolicitud, default: EstadoSolicitud.Pendiente })
    estado: EstadoSolicitud;
}