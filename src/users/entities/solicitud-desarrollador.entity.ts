import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { BaseEntity } from '../../config/models/base-entity.entity';

export enum EstadoSolicitud {
  Pendiente = 0,
  Aceptada = 1,
  Rechazada = 2,
}

@Entity('solicitudes-desarrollador')
export class SolicitudDesarrollador extends BaseEntity {
  @Column()
  titulo: string;

  @Column()
  mensaje: string;

  @OneToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @Column({
    type: 'enum',
    enum: EstadoSolicitud,
    default: EstadoSolicitud.Pendiente,
  })
  estado: EstadoSolicitud;
}
