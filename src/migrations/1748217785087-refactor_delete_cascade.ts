import { MigrationInterface, QueryRunner } from 'typeorm';

export class RefactorDeleteCascade1748217785087 implements MigrationInterface {
  name = 'RefactorDeleteCascade1748217785087';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reports" DROP CONSTRAINT "FK_5987668a46336d5f1f01e9527a4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reports" DROP CONSTRAINT "FK_ca7a21eb95ca4625bd5eaef7e0c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "noticias" DROP CONSTRAINT "FK_2ca80788b0f4035255fef63f4c6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "video_game_assets" DROP CONSTRAINT "FK_9d863fd281393cad6292dad43c4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "video_game_assets" DROP CONSTRAINT "FK_79ccfc8beeaf6778638e86b5ddd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reports" ADD CONSTRAINT "FK_ca7a21eb95ca4625bd5eaef7e0c" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reports" ADD CONSTRAINT "FK_5987668a46336d5f1f01e9527a4" FOREIGN KEY ("video_game_id") REFERENCES "videogames"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "noticias" ADD CONSTRAINT "FK_2ca80788b0f4035255fef63f4c6" FOREIGN KEY ("autor_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "video_game_assets" ADD CONSTRAINT "FK_79ccfc8beeaf6778638e86b5ddd" FOREIGN KEY ("video_game_id") REFERENCES "videogames"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "video_game_assets" ADD CONSTRAINT "FK_9d863fd281393cad6292dad43c4" FOREIGN KEY ("asset_id") REFERENCES "assets"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
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
      `ALTER TABLE "noticias" DROP CONSTRAINT "FK_2ca80788b0f4035255fef63f4c6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reports" DROP CONSTRAINT "FK_5987668a46336d5f1f01e9527a4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reports" DROP CONSTRAINT "FK_ca7a21eb95ca4625bd5eaef7e0c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "video_game_assets" ADD CONSTRAINT "FK_79ccfc8beeaf6778638e86b5ddd" FOREIGN KEY ("video_game_id") REFERENCES "videogames"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "video_game_assets" ADD CONSTRAINT "FK_9d863fd281393cad6292dad43c4" FOREIGN KEY ("asset_id") REFERENCES "assets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "noticias" ADD CONSTRAINT "FK_2ca80788b0f4035255fef63f4c6" FOREIGN KEY ("autor_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reports" ADD CONSTRAINT "FK_ca7a21eb95ca4625bd5eaef7e0c" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reports" ADD CONSTRAINT "FK_5987668a46336d5f1f01e9527a4" FOREIGN KEY ("video_game_id") REFERENCES "videogames"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
