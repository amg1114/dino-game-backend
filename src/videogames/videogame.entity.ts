import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('videogames')
export class videogame {
    @PrimaryGeneratedColumn()
    idJuego: number;

    @Column()
    precio: number;

    @Column()
    genero: string;

    @Column()
    titulo: string;

    @Column()
    descripcion: string;

    @Column({type: 'date'})
    fechaLanzamiento: Date;
}