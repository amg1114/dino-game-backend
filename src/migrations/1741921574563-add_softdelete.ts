import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSoftdelete1741921574563 implements MigrationInterface {
  name = 'AddSoftdelete1741921574563';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "categorias" ADD "deleted_at" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "descuentos" ADD "deleted_at" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "versions" ADD "deleted_at" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_videogames" ADD "deleted_at" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "videogames" ADD "deleted_at" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "users" ADD "deleted_at" TIMESTAMP`);
    await queryRunner.query(
      `ALTER TABLE "developers" ADD "deleted_at" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "noticias" ADD "deleted_at" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "solicitudes-desarrollador" ADD "deleted_at" TIMESTAMP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "solicitudes-desarrollador" DROP COLUMN "deleted_at"`,
    );
    await queryRunner.query(`ALTER TABLE "noticias" DROP COLUMN "deleted_at"`);
    await queryRunner.query(
      `ALTER TABLE "developers" DROP COLUMN "deleted_at"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deleted_at"`);
    await queryRunner.query(
      `ALTER TABLE "videogames" DROP COLUMN "deleted_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_videogames" DROP COLUMN "deleted_at"`,
    );
    await queryRunner.query(`ALTER TABLE "versions" DROP COLUMN "deleted_at"`);
    await queryRunner.query(
      `ALTER TABLE "descuentos" DROP COLUMN "deleted_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "categorias" DROP COLUMN "deleted_at"`,
    );
  }
}
