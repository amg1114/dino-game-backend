import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Version } from 'src/video-games/entities/version.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VersionService {
  constructor(
    @InjectRepository(Version)
    private readonly versionRepository: Repository<Version>,
  ) {}

  findById(id: number) {
    return this.versionRepository.findOne({
      where: { id },
      relations: ['videoGame'],
    });
  }
}
