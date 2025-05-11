import { MigrationInterface, QueryRunner } from 'typeorm';

export class ApplyBaseEntity1746995459465 implements MigrationInterface {
  name = 'ApplyBaseEntity1746995459465';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "descuentos" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "descuentos" ADD "deleted_at" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "versions" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "versions" ADD "deleted_at" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "requisitos" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "requisitos" ADD "deleted_at" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "assets" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "assets" ADD "deleted_at" TIMESTAMP`);
    await queryRunner.query(
      `ALTER TABLE "noticias" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "noticias" ADD "deleted_at" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_videogames" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_videogames" ADD "deleted_at" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "videogames" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "videogames" ADD "deleted_at" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "categorias" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "categorias" ADD "deleted_at" TIMESTAMP`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "categorias" DROP COLUMN "deleted_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "categorias" DROP COLUMN "created_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "videogames" DROP COLUMN "deleted_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "videogames" DROP COLUMN "created_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_videogames" DROP COLUMN "deleted_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_videogames" DROP COLUMN "created_at"`,
    );
    await queryRunner.query(`ALTER TABLE "noticias" DROP COLUMN "deleted_at"`);
    await queryRunner.query(`ALTER TABLE "noticias" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "assets" DROP COLUMN "deleted_at"`);
    await queryRunner.query(`ALTER TABLE "assets" DROP COLUMN "created_at"`);
    await queryRunner.query(
      `ALTER TABLE "requisitos" DROP COLUMN "deleted_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "requisitos" DROP COLUMN "created_at"`,
    );
    await queryRunner.query(`ALTER TABLE "versions" DROP COLUMN "deleted_at"`);
    await queryRunner.query(`ALTER TABLE "versions" DROP COLUMN "created_at"`);
    await queryRunner.query(
      `ALTER TABLE "descuentos" DROP COLUMN "deleted_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "descuentos" DROP COLUMN "created_at"`,
    );
  }
}
