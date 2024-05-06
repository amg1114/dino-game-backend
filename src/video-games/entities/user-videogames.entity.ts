import { User } from "src/users/entities/user.entity";
import { PrimaryGeneratedColumn, Column, ManyToOne, Entity } from "typeorm";
import { VideoGame } from "./video-game.entity";

@Entity('user_videogames')
export class UserVideoGame {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'date' })
    fechaCompra: Date;

    @ManyToOne(() => User, user => user.userVideoGames, { onDelete: 'CASCADE' })
    user: User;

    @ManyToOne(() => VideoGame, videoGame => videoGame.userVideoGames, { onDelete: 'CASCADE' })
    videoGame: VideoGame;
}