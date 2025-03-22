import { MigrationInterface, QueryRunner } from 'typeorm';

export class RefactorUserRoles1742683030345 implements MigrationInterface {
  name = 'RefactorUserRoles1742683030345';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" RENAME COLUMN "tipo" TO "role"`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."users_tipo_enum" RENAME TO "users_role_enum"`,
    );
    await queryRunner.query(`ALTER TABLE "noticias" ADD "thumbId" integer`);
    await queryRunner.query(`ALTER TABLE "videogames" ADD "thumbId" integer`);
    await queryRunner.query(`ALTER TABLE "videogames" ADD "heroId" integer`);
    await queryRunner.query(
      `ALTER TABLE "noticias" ADD CONSTRAINT "FK_ce91428937d88ec8717bf669fb1" FOREIGN KEY ("thumbId") REFERENCES "assets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "videogames" ADD CONSTRAINT "FK_6948c32600b0671886849833eff" FOREIGN KEY ("thumbId") REFERENCES "assets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "videogames" ADD CONSTRAINT "FK_3d32b9d079a4c734fed9529e67f" FOREIGN KEY ("heroId") REFERENCES "assets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "videogames" DROP CONSTRAINT "FK_3d32b9d079a4c734fed9529e67f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "videogames" DROP CONSTRAINT "FK_6948c32600b0671886849833eff"`,
    );
    await queryRunner.query(
      `ALTER TABLE "noticias" DROP CONSTRAINT "FK_ce91428937d88ec8717bf669fb1"`,
    );
    await queryRunner.query(`ALTER TABLE "videogames" DROP COLUMN "heroId"`);
    await queryRunner.query(`ALTER TABLE "videogames" DROP COLUMN "thumbId"`);
    await queryRunner.query(`ALTER TABLE "noticias" DROP COLUMN "thumbId"`);
    await queryRunner.query(
      `ALTER TYPE "public"."users_role_enum" RENAME TO "users_tipo_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" RENAME COLUMN "role" TO "tipo"`,
    );
  }
}
