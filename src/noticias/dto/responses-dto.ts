import { ApiProperty } from "@nestjs/swagger";

export class NoticiasNotFoundResponseDto {
    @ApiProperty({
        example: 404
    })
    statusCode: number
    @ApiProperty({
        example: 'No noticias found'
    })
    message: string
}

export class NoticiaNotFoundResponseDto {
    @ApiProperty({
        example: 404
    })
    statusCode: number
    @ApiProperty({
        example: 'Noticia not found'
    })
    message: string
}