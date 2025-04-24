import { Column, Entity, OneToMany } from 'typeorm';
import { Sexo } from '../../config/enums/sexo.enum';
import { Exclude } from 'class-transformer';
import { UserVideoGame } from '../../video-games/entities/user-videogames.entity';
import { Noticia } from '../../noticias/entities/noticia.entity';
import { Role } from '../../config/enums/roles.enum';
import {
  Calificacion,
  Comentario,
} from '../../video-games/entities/calificacion.entity';
import { Report } from '../../reports/entities/report.entity';
import { Like } from '../../noticias/entities/like.entity';
import { BaseEntity } from '../../config/models/base-entity.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column()
  nombre: string;

  @Column({ type: 'date' })
  fechaNacimiento: Date;

  @Column({ type: 'enum', enum: Sexo, default: Sexo.Dinosaurio })
  sexo: Sexo;

  @Column()
  pais: string;

  @Column({ type: 'enum', enum: Role, default: Role.ESTANDAR })
  tipo: Role;

  @Column({ unique: true })
  correo: string;

  @Exclude()
  @Column()
  password: string;

  @OneToMany(() => UserVideoGame, (userVideoGame) => userVideoGame.user)
  userVideoGames: UserVideoGame[];

  @OneToMany(() => Noticia, (noticia) => noticia.autor)
  noticias: Noticia[];

  @OneToMany(() => Calificacion, (calificacion) => calificacion.user)
  calificaciones: Calificacion[];

  @OneToMany(() => Comentario, (comentario) => comentario.user)
  comentarios: Comentario[];

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

  @OneToMany(() => Like, (like) => like.user)
  like: Like[];
}
