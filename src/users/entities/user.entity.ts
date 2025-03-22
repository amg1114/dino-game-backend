import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Sexo } from '../../config/enums/sexo.enum';
import { Exclude } from 'class-transformer';
import { UserVideoGame } from '../../video-games/entities/user-videogames.entity';
import { Noticia } from '../../noticias/noticia.entity';
import { VideoGame } from '../../video-games/entities/video-game.entity';
import { Role } from '../../config/enums/roles.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ type: 'date' })
  fechaNacimiento: Date;

  @Column({ type: 'enum', enum: Sexo, default: Sexo.Dinosaurio })
  sexo: Sexo;

  @Column()
  pais: string;

  @Column({ type: 'enum', enum: Role, default: Role.ESTANDAR })
  role: Role;

  @Column({ unique: true })
  correo: string;

  @Exclude()
  @Column()
  password: string;

  @OneToMany(() => UserVideoGame, (userVideoGame) => userVideoGame.user)
  userVideoGames: UserVideoGame[];

  @OneToMany(() => Noticia, (noticia) => noticia.autor)
  noticias: Noticia[];

  @OneToMany(() => VideoGame, (videoGame) => videoGame.developer)
  videoGames: VideoGame[];
}
