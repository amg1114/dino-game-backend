import { MigrationInterface, QueryRunner } from 'typeorm';

export class AssetsRefactory1742880178797 implements MigrationInterface {
  name = 'AssetsRefactory1742880178797';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "noticias" ADD "noticiaThumb" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "videogames" ADD "videoGameThumb" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "videogames" ADD "videoGameHero" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "noticias" ADD CONSTRAINT "FK_d3a0a482571b98cfda2eb37bdb8" FOREIGN KEY ("noticiaThumb") REFERENCES "noticias"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "videogames" ADD CONSTRAINT "FK_39c19ab0f81a2148d8171e56122" FOREIGN KEY ("videoGameThumb") REFERENCES "assets"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "videogames" ADD CONSTRAINT "FK_def20d2bbee0cee58d6a9a8ae36" FOREIGN KEY ("videoGameHero") REFERENCES "assets"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`DROP TABLE "assets_noticias"`);
    await queryRunner.query(`DROP TABLE "assets_videogames"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "videogames" DROP CONSTRAINT "FK_def20d2bbee0cee58d6a9a8ae36"`,
    );
    await queryRunner.query(
      `ALTER TABLE "videogames" DROP CONSTRAINT "FK_39c19ab0f81a2148d8171e56122"`,
    );
    await queryRunner.query(
      `ALTER TABLE "noticias" DROP CONSTRAINT "FK_d3a0a482571b98cfda2eb37bdb8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "videogames" DROP COLUMN "videoGameHero"`,
    );
    await queryRunner.query(
      `ALTER TABLE "videogames" DROP COLUMN "videoGameThumb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "noticias" DROP COLUMN "noticiaThumb"`,
    );
    await queryRunner.query(
      `CREATE TABLE "assets_videogames" ("asset_id" integer NOT NULL, "assetID" integer, "video_game_id" integer, CONSTRAINT "REL_c0c80001f2aa8fc0022d2cf54c" UNIQUE ("assetID"), CONSTRAINT "PK_cd1b8bb3b61608299792604a18f" PRIMARY KEY ("asset_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "assets_noticias" ("asset_id" integer NOT NULL, "assetID" integer, "noticia_id" integer, CONSTRAINT "REL_0d7ad6ed800f1a4116aa771cad" UNIQUE ("assetID"), CONSTRAINT "PK_59131e5e5e1fd0a58dbb39dd65e" PRIMARY KEY ("asset_id"))`,
    );
  }
}
