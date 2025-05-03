import { MigrationInterface, QueryRunner } from 'typeorm';

export class Prueba1746286172779 implements MigrationInterface {
  name = 'Prueba1746286172779';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "assets" DROP CONSTRAINT "FK_db30669c510416bd8e53263f819"`,
    );
    await queryRunner.query(
      `CREATE TABLE "type_reports" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "title" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_0d56ce9f328494f30746de3f65c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."reports_state_enum" AS ENUM('PENDING', 'APPROVED', 'REJECTED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "reports" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "state" "public"."reports_state_enum" NOT NULL DEFAULT 'PENDING', "user_id" integer, "video_game_id" integer, "type_report_id" integer, CONSTRAINT "PK_d9013193989303580053c0b5ef6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "likes" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" integer, "noticia_id" integer, CONSTRAINT "UQ_4c915ad57563c21d632beaabc7e" UNIQUE ("user_id", "noticia_id"), CONSTRAINT "PK_a9323de3f8bced7539a794b4a37" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "video_game_assets" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "video_game_id" integer, "asset_id" integer, CONSTRAINT "PK_7b09024b594cb7dd4b04982d22b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "assets" DROP COLUMN "index"`);
    await queryRunner.query(`ALTER TABLE "assets" DROP COLUMN "video_game_id"`);
    await queryRunner.query(
      `ALTER TABLE "reports" ADD CONSTRAINT "FK_ca7a21eb95ca4625bd5eaef7e0c" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reports" ADD CONSTRAINT "FK_5987668a46336d5f1f01e9527a4" FOREIGN KEY ("video_game_id") REFERENCES "videogames"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reports" ADD CONSTRAINT "FK_68cff9f429f8b12281e18f8793b" FOREIGN KEY ("type_report_id") REFERENCES "type_reports"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes" ADD CONSTRAINT "FK_3f519ed95f775c781a254089171" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes" ADD CONSTRAINT "FK_3474040b92fa74413221536d522" FOREIGN KEY ("noticia_id") REFERENCES "noticias"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
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
    await queryRunner.query(
      `ALTER TABLE "likes" DROP CONSTRAINT "FK_3474040b92fa74413221536d522"`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes" DROP CONSTRAINT "FK_3f519ed95f775c781a254089171"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reports" DROP CONSTRAINT "FK_68cff9f429f8b12281e18f8793b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reports" DROP CONSTRAINT "FK_5987668a46336d5f1f01e9527a4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reports" DROP CONSTRAINT "FK_ca7a21eb95ca4625bd5eaef7e0c"`,
    );
    await queryRunner.query(`ALTER TABLE "assets" ADD "video_game_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "assets" ADD "index" integer NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(`DROP TABLE "video_game_assets"`);
    await queryRunner.query(`DROP TABLE "likes"`);
    await queryRunner.query(`DROP TABLE "reports"`);
    await queryRunner.query(`DROP TYPE "public"."reports_state_enum"`);
    await queryRunner.query(`DROP TABLE "type_reports"`);
    await queryRunner.query(
      `ALTER TABLE "assets" ADD CONSTRAINT "FK_db30669c510416bd8e53263f819" FOREIGN KEY ("video_game_id") REFERENCES "videogames"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
