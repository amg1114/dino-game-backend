import { Categoria } from "src/categorias/categoria.entity";
import { VideoGame } from "src/video-games/entities/video-game.entity";
import { FindOptionsOrder } from "typeorm";

export const VideoGameOrder: FindOptionsOrder<VideoGame> = {
    assets: {
        index: 'ASC'
    },
    categorias: {
        titulo: 'ASC'
    },
    versions: {
        version: 'DESC'
    },
    descuentos: {
        fechaFin: 'DESC'
    },
    titulo: 'ASC'
}

export const CategoryOrder: FindOptionsOrder<Categoria> = {
    videoGames: VideoGameOrder,
    titulo: 'ASC'
}