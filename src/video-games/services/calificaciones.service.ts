import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Calificacion, Comentario } from '../entities/calificacion.entity';
import { Repository } from 'typeorm';
import { CreateCalificacionDto } from '../dto/calificaciones/create-calificacion.dto';
import { VideoGamesService } from './video-games.service';
import { UsersService } from 'src/users/services/users.service';
import { CreateComentarioDto } from '../dto/calificaciones/create-comentario.dto';

@Injectable()
export class CalificacionesService {
  constructor(
    @InjectRepository(Calificacion)
    private readonly calificacionRepository: Repository<Calificacion>,
    @InjectRepository(Comentario)
    private readonly comentarioRepository: Repository<Comentario>,
    private readonly videoGameService: VideoGamesService,
    private readonly userService: UsersService,
  ) {}

  /**
   * Creates a new calificación (rating) for a video game by a specific user.
   *
   * @param userId - The ID of the user creating the calificación.
   * @param videoGameId - The ID of the video game being rated.
   * @param calificationFields - The data for the calificación, provided as a `CreateCalificacionDto` object.
   *
   * @throws ConflictException - If a calificación already exists for the specified video game by the same user.
   *
   * @returns A promise that resolves to the saved calificación entity.
   */
  async createCalificacion(
    userId: number,
    gameSlug: string,
    { puntaje }: CreateCalificacionDto,
  ) {
    const videoGame = await this.videoGameService.softFindById(gameSlug);
    const user = await this.userService.findById(userId);

    if (!videoGame) {
      throw new NotFoundException('El videojuego no existe');
    }

    const currentCalificacion = await this.calificacionRepository.findOne({
      where: {
        user: { id: userId },
        videoGame: { slug: gameSlug },
      },
    });

    if (currentCalificacion) {
      throw new ConflictException(
        'Ya existe una calificación para este videojuego por parte de este usuario',
      );
    }

    const calificacion = this.calificacionRepository.create({
      puntaje,
    });

    calificacion.videoGame = videoGame;
    calificacion.user = user;

    return this.calificacionRepository.save(calificacion);
  }

  /**
   * Updates the calificación (score) of an existing record by its ID.
   *
   * @param id - The unique identifier of the calification to update.
   * @param param1 - An object containing the updated calification data.
   * @param param1.puntaje - The new score to assign to the calification.
   * @returns A promise resolving to the result of the update operation.
   * @throws {NotFoundException} If no calification is found with the given ID.
   */
  async updateCalificacion(id: number, { puntaje }: CreateCalificacionDto) {
    const result = await this.calificacionRepository.update(id, { puntaje });

    if (result.affected === 0) {
      throw new NotFoundException('No se encontró la calificación');
    }

    return result;
  }

  /**
   * Deletes a calificación (csore) by its ID.
   *
   * @param id - The ID of the calificación to delete.
   * @returns The result of the delete operation.
   * @throws NotFoundException - If no calificación is found with the given ID.
   */
  async deleteCalificacion(id: number) {
    const result = await this.calificacionRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('No se encontró la calificación');
    }

    return result;
  }

  /**
   * Creates a new comentario (comment) for a video game by a specific user.
   *
   * @param userId - The ID of the user creating the comentario.
   * @param videoGameId - The ID of the video game being commented on.
   * @param comentario - The content of the comentario.
   *
   * @throws NotFoundException - If the specified video game or user does not exist.
   *
   * @returns A promise that resolves to the saved comentario entity.
   */
  async createComentario(
    userId: number,
    gameSlug: string,
    { comentario }: CreateComentarioDto,
  ) {
    const videoGame = await this.videoGameService.softFindById(gameSlug);
    const user = await this.userService.findById(userId);

    if (!videoGame) {
      throw new NotFoundException('El videojuego no existe');
    }

    const newComentario = this.comentarioRepository.create({
      comentario,
    });
    newComentario.user = user;
    newComentario.videoGame = videoGame;

    return this.comentarioRepository.save(newComentario);
  }

  /**
   * Updates the comentario (comment) of an existing record by its ID.
   *
   * @param id - The unique identifier of the comentario to update.
   * @param comentarioDto - An object containing the updated comentario data.
   * @throws {NotFoundException} If no comentario is found with the given ID.
   * @returns A promise containing the result of the update operation.
   */
  async updateComentario(id: number, { comentario }: CreateComentarioDto) {
    const result = await this.comentarioRepository.update(id, { comentario });

    if (result.affected === 0) {
      throw new NotFoundException('No se encontró el comentario');
    }

    return result;
  }

  /**
   * Deletes a comentario (comment) by its ID.
   *
   * @param id - The ID of the comentario to delete.
   * @returns The result of the delete operation.
   * @throws {NotFoundException} If no comentario with the given ID is found.
   */
  async deleteComentario(id: number) {
    const result = await this.comentarioRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('No se encontró el comentario');
    }

    return result;
  }
}
