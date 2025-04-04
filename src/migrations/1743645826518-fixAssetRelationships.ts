import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixAssetRelationships1743645826518 implements MigrationInterface {
  name = 'FixAssetRelationships1743645826518';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "videogames" ADD "thumb_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "videogames" ADD CONSTRAINT "UQ_cfd29c4c59ff17360a8ed861fe7" UNIQUE ("thumb_id")`,
    );
    await queryRunner.query(`ALTER TABLE "videogames" ADD "hero_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "videogames" ADD CONSTRAINT "UQ_2f819dab7253162962189f97a55" UNIQUE ("hero_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "noticias" ADD "noticiaThumb" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "noticias" ADD CONSTRAINT "UQ_d3a0a482571b98cfda2eb37bdb8" UNIQUE ("noticiaThumb")`,
    );
    await queryRunner.query(
      `ALTER TABLE "videogames" ADD CONSTRAINT "FK_cfd29c4c59ff17360a8ed861fe7" FOREIGN KEY ("thumb_id") REFERENCES "assets"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "videogames" ADD CONSTRAINT "FK_2f819dab7253162962189f97a55" FOREIGN KEY ("hero_id") REFERENCES "assets"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
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
      `ALTER TABLE "videogames" DROP CONSTRAINT "FK_2f819dab7253162962189f97a55"`,
    );
    await queryRunner.query(
      `ALTER TABLE "videogames" DROP CONSTRAINT "FK_cfd29c4c59ff17360a8ed861fe7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "noticias" DROP CONSTRAINT "UQ_d3a0a482571b98cfda2eb37bdb8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "noticias" DROP COLUMN "noticiaThumb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "videogames" DROP CONSTRAINT "UQ_2f819dab7253162962189f97a55"`,
    );
    await queryRunner.query(`ALTER TABLE "videogames" DROP COLUMN "hero_id"`);
    await queryRunner.query(
      `ALTER TABLE "videogames" DROP CONSTRAINT "UQ_cfd29c4c59ff17360a8ed861fe7"`,
    );
    await queryRunner.query(`ALTER TABLE "videogames" DROP COLUMN "thumb_id"`);
  }
}
