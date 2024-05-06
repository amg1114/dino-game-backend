import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Sexo } from "src/config/enums/sexo.enum";
import { VideoGame } from "src/video-games/entities/video-game.entity";
import { Exclude } from "class-transformer";
import { UserVideoGame } from "src/video-games/entities/user-videogames.entity";

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

    @OneToMany(() => UserVideoGame, userVideoGame => userVideoGame.user)
    userVideoGames: UserVideoGame[]
}

@Entity('administrators')
export class Administrator {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User, user => user.id, ) 
    @JoinColumn()
    user: User;
}

@Entity('developers')
export class Developer {
    @PrimaryGeneratedColumn()
    id: number;
    
    @OneToOne(() => User, user => user.id)
    @JoinColumn()
    user: User;

    @OneToMany(() => VideoGame, videoGame => videoGame.developer)
    videoGames: VideoGame[];
}