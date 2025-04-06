import { MigrationInterface, QueryRunner } from 'typeorm';

export class RefactorSolicitudDesarrollador1743912290441
  implements MigrationInterface
{
  name = 'RefactorSolicitudDesarrollador1743912290441';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "solicitudes-desarrollador" DROP COLUMN "nombre"`,
    );
    await queryRunner.query(
      `ALTER TABLE "solicitudes-desarrollador" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "solicitudes-desarrollador" ADD "deleted_at" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "solicitudes-desarrollador" ADD "titulo" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "solicitudes-desarrollador" DROP COLUMN "titulo"`,
    );
    await queryRunner.query(
      `ALTER TABLE "solicitudes-desarrollador" DROP COLUMN "deleted_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "solicitudes-desarrollador" DROP COLUMN "created_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "solicitudes-desarrollador" ADD "nombre" character varying NOT NULL`,
    );
  }
}
