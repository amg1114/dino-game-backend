import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIndexToVideogameAssets1748135595239
  implements MigrationInterface
{
  name = 'AddIndexToVideogameAssets1748135595239';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "video_game_assets" ADD "index" integer NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "video_game_assets" DROP COLUMN "index"`,
    );
  }
}
