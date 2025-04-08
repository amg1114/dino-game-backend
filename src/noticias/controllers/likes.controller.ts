import {
  Controller,
  Get,
  Post,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LikesService } from '../services/likes.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Like } from '../entities/like.entity';

@ApiTags('Likes')
@Controller('likes')
@UseGuards(AuthGuard, RolesGuard)
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @ApiOperation({
    summary: 'Post or delete a like',
    description:
      'Elimina un like existente o crea uno nuevo en la base de datos',
  })
  @ApiResponse({
    status: 200,
    description: 'Se creó / eliminó un like en la noticia',
    type: Like,
  })
  @Post(':noticiaId')
  async manejoLikes(
    @Param('noticiaId') noticiaId: number,
    @Request() req: any,
  ) {
    const userId = req.user;
    return this.likesService.manejoLike(userId.id, noticiaId);
  }

  @ApiOperation({
    summary: 'Get a like',
    description: 'Obtener un like',
  })
  @ApiResponse({
    status: 200,
    description: 'Like data',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid order value. Allowed values are ASC or DESC.',
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontró el like ',
  })
  @Get('likeId')
  async findOneLike(@Param('likeId') likeId: number) {
    return this.likesService.findoneLike(likeId);
  }
}
