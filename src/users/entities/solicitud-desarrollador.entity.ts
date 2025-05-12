import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { BaseEntity } from '../../config/models/base-entity.entity';
import { State } from '../../config/enums/state';

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
    enum: State,
    default: State.PENDING,
  })
  estado: State;
}
