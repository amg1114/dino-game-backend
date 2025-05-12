import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBaseEntityIntoVideogamesEntity1746836077827
  implements MigrationInterface
{
  name = 'AddBaseEntityIntoVideogamesEntity1746836077827';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "videogames" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "videogames" ADD "deleted_at" TIMESTAMP`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "videogames" DROP COLUMN "deleted_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "videogames" DROP COLUMN "created_at"`,
    );
  }
}
