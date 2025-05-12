import { MigrationInterface, QueryRunner } from 'typeorm';

export class RefactorRequestState1747007282235 implements MigrationInterface {
  name = 'RefactorRequestState1747007282235';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."solicitudes-desarrollador_estado_enum" RENAME TO "solicitudes-desarrollador_estado_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."solicitudes-desarrollador_estado_enum" AS ENUM('PENDING', 'APPROVED', 'REJECTED')`,
    );
    await queryRunner.query(
      `ALTER TABLE "solicitudes-desarrollador" ALTER COLUMN "estado" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "solicitudes-desarrollador" ALTER COLUMN "estado" TYPE "public"."solicitudes-desarrollador_estado_enum" USING "estado"::"text"::"public"."solicitudes-desarrollador_estado_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "solicitudes-desarrollador" ALTER COLUMN "estado" SET DEFAULT 'PENDING'`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."solicitudes-desarrollador_estado_enum_old"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."solicitudes-desarrollador_estado_enum_old" AS ENUM('0', '1', '2')`,
    );
    await queryRunner.query(
      `ALTER TABLE "solicitudes-desarrollador" ALTER COLUMN "estado" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "solicitudes-desarrollador" ALTER COLUMN "estado" TYPE "public"."solicitudes-desarrollador_estado_enum_old" USING "estado"::"text"::"public"."solicitudes-desarrollador_estado_enum_old"`,
    );
    await queryRunner.query(
      `ALTER TABLE "solicitudes-desarrollador" ALTER COLUMN "estado" SET DEFAULT '0'`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."solicitudes-desarrollador_estado_enum"`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."solicitudes-desarrollador_estado_enum_old" RENAME TO "solicitudes-desarrollador_estado_enum"`,
    );
  }
}
