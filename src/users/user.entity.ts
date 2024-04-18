import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Sexo } from "src/config/enums/sexo.enum";

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

}