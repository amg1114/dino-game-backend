import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixRelationBetweenNoticesAndAssets1743130090293
  implements MigrationInterface
{
  name = 'FixRelationBetweenNoticesAndAssets1743130090293';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "noticias" DROP CONSTRAINT "FK_d3a0a482571b98cfda2eb37bdb8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "noticias" ADD CONSTRAINT "FK_d3a0a482571b98cfda2eb37bdb8" FOREIGN KEY ("noticiaThumb") REFERENCES "assets"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "noticias" DROP CONSTRAINT "FK_d3a0a482571b98cfda2eb37bdb8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "noticias" ADD CONSTRAINT "FK_d3a0a482571b98cfda2eb37bdb8" FOREIGN KEY ("noticiaThumb") REFERENCES "noticias"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
