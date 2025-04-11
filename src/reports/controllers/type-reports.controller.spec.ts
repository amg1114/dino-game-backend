import { Test, TestingModule } from '@nestjs/testing';
import { TypeReportsController } from './type-reports.controller';

describe('TypeReportsController', () => {
  let controller: TypeReportsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypeReportsController],
    }).compile();

    controller = module.get<TypeReportsController>(TypeReportsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
