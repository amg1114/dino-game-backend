import { Asset } from 'src/assets/asset.entity';
import { PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

export class Noticia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  descripcion: string;

  @Column()
  fecha: Date;

  @OneToMany(() => Asset, (asset) => asset.noticia)
  assets: Asset[];
}
