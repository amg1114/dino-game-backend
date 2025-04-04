import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCalificacionRelationships1743646943165
  implements MigrationInterface
{
  name = 'AddCalificacionRelationships1743646943165';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "calificaciones" ADD "user_id" integer`,
    );
    await queryRunner.query(`ALTER TABLE "comentarios" ADD "user_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "calificaciones" ADD CONSTRAINT "FK_babffd9530f6f0f89c0caaf1fb3" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comentarios" ADD CONSTRAINT "FK_6e08ee40b6d045211e0a0e28f9e" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "comentarios" DROP CONSTRAINT "FK_6e08ee40b6d045211e0a0e28f9e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "calificaciones" DROP CONSTRAINT "FK_babffd9530f6f0f89c0caaf1fb3"`,
    );
    await queryRunner.query(`ALTER TABLE "comentarios" DROP COLUMN "user_id"`);
    await queryRunner.query(
      `ALTER TABLE "calificaciones" DROP COLUMN "user_id"`,
    );
  }
}
