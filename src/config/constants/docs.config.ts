import { DocumentBuilder } from '@nestjs/swagger';

export const DocsConfig = new DocumentBuilder()
  .setTitle('DinoGame API Documentation')
  .setDescription('La documentacíon de la API DinoGame')
  .setVersion('1.0')
  .build();
