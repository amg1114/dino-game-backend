import { MigrationInterface, QueryRunner } from 'typeorm';

export class RefactorVersionAsset1747188267438 implements MigrationInterface {
  name = 'RefactorVersionAsset1747188267438';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "versions" RENAME COLUMN "url" TO "file_id"`,
    );
    await queryRunner.query(`ALTER TABLE "versions" DROP COLUMN "file_id"`);
    await queryRunner.query(`ALTER TABLE "versions" ADD "file_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "versions" ADD CONSTRAINT "UQ_4ec0bab9eab8f6a2ef5b5f83fcd" UNIQUE ("file_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "versions" ADD CONSTRAINT "FK_4ec0bab9eab8f6a2ef5b5f83fcd" FOREIGN KEY ("file_id") REFERENCES "assets"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "versions" DROP CONSTRAINT "FK_4ec0bab9eab8f6a2ef5b5f83fcd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "versions" DROP CONSTRAINT "UQ_4ec0bab9eab8f6a2ef5b5f83fcd"`,
    );
    await queryRunner.query(`ALTER TABLE "versions" DROP COLUMN "file_id"`);
    await queryRunner.query(
      `ALTER TABLE "versions" ADD "file_id" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "versions" RENAME COLUMN "file_id" TO "url"`,
    );
  }
}
