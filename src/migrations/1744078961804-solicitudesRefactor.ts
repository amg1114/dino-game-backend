import { MigrationInterface, QueryRunner } from 'typeorm';

export class SolicitudesRefactor1744078961804 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "solicitudes-desarrollador" RENAME COLUMN "nombre" TO "titulo"`,
    );
    await queryRunner.query(
      `ALTER TABLE "solicitudes-desarrollador" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "solicitudes-desarrollador" ADD "deleted_at" TIMESTAMP`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "solicitudes-desarrollador" DROP COLUMN "deleted_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "solicitudes-desarrollador" DROP COLUMN "created_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "solicitudes-desarrollador" RENAME COLUMN "titulo" TO "nombre"`,
    );
  }
}
