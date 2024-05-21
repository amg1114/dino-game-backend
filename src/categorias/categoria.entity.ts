import { VideoGame } from "../video-games/entities/video-game.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('categorias')
export class Categoria {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titulo: string;

    @Column({ nullable: true })
    descripcion: string;

    @ManyToMany(()=>VideoGame, videoGame=>videoGame.categorias)
    @JoinTable({
        name: 'categorias_video-games'
    })
    videoGames: VideoGame[]
}