import { ApiProperty } from "@nestjs/swagger";

export class DescuentosNotFoundResponseDto {
    @ApiProperty({
        example: 404
    })
    statusCode: number
    @ApiProperty({
        example: 'Discounts was not found'
    })
    message: string
}

export class DeleteDescuentoResponseDto {
    @ApiProperty({
        example: 409
    })
    statusCode: number
    @ApiProperty({
        example: 'Discount could not deleted'
    })
    message: string
}