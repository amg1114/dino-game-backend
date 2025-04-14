import { MigrationInterface, QueryRunner } from 'typeorm';

export class AssetsRefactor1744594321654 implements MigrationInterface {
  name = 'AssetsRefactor1744594321654';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "assets" DROP CONSTRAINT "FK_db30669c510416bd8e53263f819"`,
    );
    await queryRunner.query(
      `CREATE TABLE "video_game_assets" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "video_game_id" integer, "asset_id" integer, CONSTRAINT "PK_7b09024b594cb7dd4b04982d22b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "assets" DROP COLUMN "index"`);
    await queryRunner.query(`ALTER TABLE "assets" DROP COLUMN "video_game_id"`);
    await queryRunner.query(
      `ALTER TABLE "video_game_assets" ADD CONSTRAINT "FK_79ccfc8beeaf6778638e86b5ddd" FOREIGN KEY ("video_game_id") REFERENCES "videogames"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "video_game_assets" ADD CONSTRAINT "FK_9d863fd281393cad6292dad43c4" FOREIGN KEY ("asset_id") REFERENCES "assets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "video_game_assets" DROP CONSTRAINT "FK_9d863fd281393cad6292dad43c4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "video_game_assets" DROP CONSTRAINT "FK_79ccfc8beeaf6778638e86b5ddd"`,
    );
    await queryRunner.query(`ALTER TABLE "assets" ADD "video_game_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "assets" ADD "index" integer NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(`DROP TABLE "video_game_assets"`);
    await queryRunner.query(
      `ALTER TABLE "assets" ADD CONSTRAINT "FK_db30669c510416bd8e53263f819" FOREIGN KEY ("video_game_id") REFERENCES "videogames"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
