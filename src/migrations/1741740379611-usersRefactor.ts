import { MigrationInterface, QueryRunner } from 'typeorm';

export class UsersRefactor1741740379611 implements MigrationInterface {
  name = 'UsersRefactor1741740379611';

  public async up(queryRunner: QueryRunner): Promise<void> {
    //   await queryRunner.query(
    //      `ALTER TABLE "videogames" DROP CONSTRAINT "FK_8689717bf54cfb45835aabe7cdc"`,
    //    );
    await queryRunner.query(
      `ALTER TABLE "videogames" RENAME COLUMN "developer_id" TO "developerId"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_tipo_enum" AS ENUM('ADMINISTRATOR', 'DEVELOPER', 'ESTANDAR')`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "tipo" "public"."users_tipo_enum" NOT NULL DEFAULT 'ESTANDAR'`,
    );
    await queryRunner.query(
      `ALTER TABLE "videogames" ADD CONSTRAINT "FK_4cc6319d9e418cb80ae9a7a339c" FOREIGN KEY ("developerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`DROP TABLE "developers" CASCADE`);
    await queryRunner.query(`DROP TABLE "administrators"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "administrators" ("id" integer NOT NULL, CONSTRAINT "PK_aaa48522d99c3b6b33fdea7dc2f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "developers" ("id" integer NOT NULL, CONSTRAINT "PK_247719240b950bd26dec14bdd21" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "videogames" DROP CONSTRAINT "FK_4cc6319d9e418cb80ae9a7a339c"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "tipo"`);
    await queryRunner.query(`DROP TYPE "public"."users_tipo_enum"`);
    await queryRunner.query(
      `ALTER TABLE "videogames" RENAME COLUMN "developerId" TO "developer_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "videogames" ADD CONSTRAINT "FK_8689717bf54cfb45835aabe7cdc" FOREIGN KEY ("developer_id") REFERENCES "developers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
