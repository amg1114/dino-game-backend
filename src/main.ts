import { NestFactory, Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import * as morgan from 'morgan';

import { CORS } from './config/constants/cors';

import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DocsConfig } from './config/constants/docs.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const reflector = app.get(Reflector);
  
  
  
  app.use(morgan(configService.get('ENVIRONMENT', 'combined')));
  app.setGlobalPrefix('api');
  app.enableCors(CORS);
  app.useGlobalPipes(
    new ValidationPipe({
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
 
  const docs = SwaggerModule.createDocument(app, DocsConfig);
  SwaggerModule.setup('docs', app, docs);
  
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  await app.listen(configService.get('PORT', 3000));
}
bootstrap();
