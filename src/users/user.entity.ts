import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Sexo } from "src/config/enums/sexo.enum";
import { VideoGame } from "src/video-games/video-game.entity";
import { Exclude } from "class-transformer";

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

    @Column({ unique: true })
    correo: string;

    @Exclude()
    @Column()
    password: string;

}

@Entity('administrators')
export class Administrator {
    @OneToOne(() => User, user => user.id)
    user: User;
}

@Entity('developers')
export class Developer {
    @OneToOne(() => User, user => user.id)
    user: User;

    @OneToMany(() => VideoGame, videoGame => videoGame.developer)
    videoGames: VideoGame[];
}