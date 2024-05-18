import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Descuento } from '../entities/descuento.entity';
import { VideoGame } from '../entities/video-game.entity';
import { VideoGamesService } from './video-games.service';
import { CreateDescuentoDto } from '../dto/descuentos/create-descuento.dto';
import { UpdateDescuentoDto } from '../dto/descuentos/update-descuento.dto';

@Injectable()
export class DescuentosService {
  constructor(
    @InjectRepository(VideoGame)
    private readonly videoGameRepository: Repository<VideoGame>,
    @InjectRepository(Descuento)
    private readonly descuentoRepository: Repository<Descuento>,
    private readonly videoGameService: VideoGamesService,
  ) {}

  /**
   * Busca los descuentos activos de un videojuego
   * @param id ID del videojuego
   * @returns Descuentos del videojuego
   */
  async getDescuentosByVideoGame(id: number) {
    const videoGame = await this.videoGameService.findById(id);
    const descuentos = await this.descuentoRepository.find({
      where: { videoGame, fechaFin: MoreThanOrEqual(new Date()) },
    });

    if (descuentos.length === 0) {
      throw new HttpException('Discounts was not found', HttpStatus.NOT_FOUND);
    }

    return descuentos;
  }

  /**
   * Agrega un descuento a un videojuego
   * @param id ID del videojuego
   * @param descuento Descuento a agregar
   * @returns Descuento agregado
   */
  async addDescuentoToVideoGame(id: number, descuento: CreateDescuentoDto) {
    const videoGame = await this.videoGameService.findById(id);
    const descuentoEntity = this.descuentoRepository.create(descuento);

    descuentoEntity.videoGame = videoGame;

    return this.descuentoRepository.save(descuentoEntity);
  }

  /**
   * Actualiza un descuento de un videojuego
   * @param id ID del videojuego
   * @param descuento Descuento a actualizar
   * @returns Descuento actualizado
   */
  async updateDescuentoToVideoGame(id: number, descuento: UpdateDescuentoDto) {
    const resultado = await this.descuentoRepository.update(id, descuento);
    if (resultado.affected === 0) {
      throw new HttpException(
        'Discount could not updated',
        HttpStatus.CONFLICT,
      );
    }

    return resultado;
  }

  /**
   * Elimina un descuento de un videojuego
   * @param id ID del descuento
   * @returns Resultado de la eliminación
   */
  async deleteDescuento(id: number) {
    const resultado = await this.descuentoRepository.delete(id);
    if (resultado.affected === 0) {
      throw new HttpException(
        'Discount could not deleted',
        HttpStatus.CONFLICT,
      );
    }

    return resultado;
  }
}
