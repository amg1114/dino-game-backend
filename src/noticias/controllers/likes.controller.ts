import {
  Controller,
  Post,
  Param,
  Request,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { LikesService } from '../services/likes.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Likes')
@Controller('likes')
@UseGuards(AuthGuard, RolesGuard)
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @ApiOperation({
    summary: 'Post a like',
    description: 'Crea un nuevo like en la base de datos',
  })
  @ApiResponse({
    status: 200,
    description: 'Se creó un like en la noticia',
  })
  @Post(':noticiaId')
  async createLikes(
    @Param('noticiaId') noticiaId: number,
    @Request() req: any,
  ) {
    const userId = req.user;
    return this.likesService.createLike(userId.id, noticiaId);
  }

  @ApiOperation({
    summary: 'Delete a like',
    description: 'Elimina un like de la base de datos',
  })
  @ApiResponse({
    status: 200,
    description: 'Se eliminó el like de la noticia',
  })
  @Delete(':noticiaId')
  async deleteLike(@Param('noticiaId') noticiaId: number, @Request() req: any) {
    const userId = req.user;
    return this.likesService.deleteLike(userId.id, noticiaId);
  }
}
