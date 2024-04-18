import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('videogames')
export class VideoGame {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    precio: number;

    @Column()
    titulo: string;

    @Column({ nullable: true })
    descripcion: string;

    @Column({type: 'date'})
    fechaLanzamiento: Date;
}