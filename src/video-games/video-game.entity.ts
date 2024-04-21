import { Asset } from 'src/assets/asset.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ type: 'date' })
  fechaLanzamiento: Date;

  @OneToMany(() => Asset, (asset) => asset.videoGame)
  assets: Asset[];
}
