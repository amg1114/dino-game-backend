import { MigrationInterface, QueryRunner } from 'typeorm';

export class Calificaciones1743645683887 implements MigrationInterface {
  name = 'Calificaciones1743645683887';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "videogames" DROP CONSTRAINT "FK_39c19ab0f81a2148d8171e56122"`,
    );
    await queryRunner.query(
      `ALTER TABLE "videogames" DROP CONSTRAINT "FK_def20d2bbee0cee58d6a9a8ae36"`,
    );
    await queryRunner.query(
      `ALTER TABLE "noticias" DROP CONSTRAINT "FK_d3a0a482571b98cfda2eb37bdb8"`,
    );
    await queryRunner.query(
      `CREATE TABLE "calificaciones" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "puntaje" integer NOT NULL DEFAULT '0', "video_game_id" integer, CONSTRAINT "PK_45fac93d6e61f7cd3b4f28020b0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "comentarios" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "comentario" character(500) NOT NULL, "video_game_id" integer, CONSTRAINT "PK_b60b1468bb275db8d5e875c4a78" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "videogames" DROP COLUMN "videoGameThumb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "videogames" DROP COLUMN "videoGameHero"`,
    );
    await queryRunner.query(
      `ALTER TABLE "noticias" DROP COLUMN "noticiaThumb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "calificaciones" ADD CONSTRAINT "FK_1b2029b28e45576ee4db480dbc7" FOREIGN KEY ("video_game_id") REFERENCES "videogames"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comentarios" ADD CONSTRAINT "FK_458be82699b9d8d2bd676db431d" FOREIGN KEY ("video_game_id") REFERENCES "videogames"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "comentarios" DROP CONSTRAINT "FK_458be82699b9d8d2bd676db431d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "calificaciones" DROP CONSTRAINT "FK_1b2029b28e45576ee4db480dbc7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "noticias" ADD "noticiaThumb" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "videogames" ADD "videoGameHero" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "videogames" ADD "videoGameThumb" integer`,
    );
    await queryRunner.query(`DROP TABLE "comentarios"`);
    await queryRunner.query(`DROP TABLE "calificaciones"`);
    await queryRunner.query(
      `ALTER TABLE "noticias" ADD CONSTRAINT "FK_d3a0a482571b98cfda2eb37bdb8" FOREIGN KEY ("noticiaThumb") REFERENCES "assets"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "videogames" ADD CONSTRAINT "FK_def20d2bbee0cee58d6a9a8ae36" FOREIGN KEY ("videoGameHero") REFERENCES "assets"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "videogames" ADD CONSTRAINT "FK_39c19ab0f81a2148d8171e56122" FOREIGN KEY ("videoGameThumb") REFERENCES "assets"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
