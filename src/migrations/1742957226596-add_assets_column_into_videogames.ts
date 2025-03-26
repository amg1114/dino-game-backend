import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAssetsColumnIntoVideogames1742957226596
  implements MigrationInterface
{
  name = 'AddAssetsColumnIntoVideogames1742957226596';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "assets" ADD "video_game_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "assets" ADD CONSTRAINT "FK_db30669c510416bd8e53263f819" FOREIGN KEY ("video_game_id") REFERENCES "videogames"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "assets" DROP CONSTRAINT "FK_db30669c510416bd8e53263f819"`,
    );
    await queryRunner.query(`ALTER TABLE "assets" DROP COLUMN "video_game_id"`);
  }
}
