import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Administrator, Developer, User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SolicitudDesarrollador } from './entities/solicitud-desarrollador.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Administrator, Developer, SolicitudDesarrollador])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersModule, TypeOrmModule],
})
export class UsersModule {}
