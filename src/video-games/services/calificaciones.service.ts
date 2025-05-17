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
import { CategoriasService } from 'src/categorias/categorias.service';
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
    private readonly categoriasService: CategoriasService,
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
  async updateCalificacion(
    id: number,
    userId: number,
    { puntaje }: CreateCalificacionDto,
  ) {
    const calificacion = await this.calificacionRepository.findOne({
      where: {
        id,
        user: { id: userId },
      },
    });

    if (!calificacion) {
      throw new NotFoundException('No se encontró la calificación');
    }

    const result = await this.calificacionRepository.update(id, { puntaje });

    if (result.affected === 0) {
      throw new ConflictException('No se pudo actualizar la calificación');
    }

    return result;
  }

  /**
   * Deletes a calificación (score) by its ID.
   *
   * @param id - The ID of the calificación to delete.
   * @returns The result of the delete operation.
   * @throws NotFoundException - If no calificación is found with the given ID.
   */
  async deleteCalificacion(id: number, userId: number) {
    const calificacion = await this.calificacionRepository.findOne({
      where: {
        id,
        user: { id: userId },
      },
    });

    if (!calificacion) {
      throw new NotFoundException('No se encontró la calificación');
    }

    const result = await this.calificacionRepository.softDelete(id);

    if (result.affected === 0) {
      throw new ConflictException('No se pudo eliminar la calificación');
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
  async updateComentario(
    id: number,
    userId: number,
    { comentario: newComentario }: CreateComentarioDto,
  ) {
    const comentario = await this.comentarioRepository.findOne({
      where: {
        id,
        user: { id: userId },
      },
    });

    if (!comentario) {
      throw new NotFoundException('No se encontró el comentario');
    }

    const result = await this.comentarioRepository.update(id, {
      comentario: newComentario,
    });

    if (result.affected === 0) {
      throw new ConflictException('No se pudo actualizar el comentario');
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
  async deleteComentario(id: number, userId: number) {
    const comentario = await this.comentarioRepository.findOne({
      where: {
        id,
        user: { id: userId },
      },
    });

    if (!comentario) {
      throw new NotFoundException('No se encontró el comentario');
    }

    const result = await this.comentarioRepository.softDelete(id);

    if (result.affected === 0) {
      throw new ConflictException('No se pudo eliminar el comentario');
    }

    return result;
  }

  /**
   * Retrieves the video game with the highest average rating in a specific category.
   *
   * This method calculates the average ratings of video games within a category
   * and retrieves the video game with the highest average rating.
   *
   * @param slug - The slug of the category to filter video games by.
   * @returns A promise that resolves to the video game object with the highest average rating,
   *          or `null` if no video games are found in the category.
   *
   * @throws {Error} If the category is not found.
   */
  async bestRatedVideoGameByCategory(slug: string) {
    const category = await this.categoriasService.findCategoriaBySlug(slug);
    if (!category) {
      throw new Error(`No se encontró la categoría con slug: ${slug}`);
    }

    const bestVideoGame = await this.calificacionRepository
      .createQueryBuilder('calificacion')
      .select('videoGame.id', 'videoGameId')
      .addSelect('AVG(calificacion.puntaje)', 'promedio')
      .innerJoin('calificacion.videoGame', 'videoGame')
      .innerJoin('videoGame.categorias', 'category')
      .where('category.id = :categoryId', { categoryId: category.id })
      .groupBy('videoGame.id')
      .orderBy('promedio', 'DESC')
      .getRawOne();

    if (!bestVideoGame) {
      const videoGameRecent = category.videoGames[0];
      if (!videoGameRecent) {
        throw new Error('No se encontraron videojuegos en esta categoría');
      }
      return this.videoGameService.findBySlug(videoGameRecent.slug);
    }

    return this.videoGameService.findBySlug(bestVideoGame.videoGame.slug);
  }
}
