import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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
    @PrimaryGeneratedColumn()
    id: number;
}

@Entity('developers')
export class Developer {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => VideoGame, videoGame => videoGame.developer)
    videoGames: VideoGame[];
}