import { MigrationInterface, QueryRunner } from 'typeorm';

export class DevelopersRefactor1745528206336 implements MigrationInterface {
  name = 'DevelopersRefactor1745528206336';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "users" ADD "deleted_at" TIMESTAMP`);
    await queryRunner.query(
      `ALTER TABLE "solicitudes-desarrollador" ALTER COLUMN "titulo" SET NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "solicitudes-desarrollador" ALTER COLUMN "titulo" DROP NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deleted_at"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`);
  }
}
