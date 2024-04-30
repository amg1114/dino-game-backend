import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column({type: 'date'})
    fechaNacimiento: Date;

    @Column()
    sexo: string;

    @Column()
    pais: string;

    @Column()
    correo: string;

}