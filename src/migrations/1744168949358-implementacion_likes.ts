import { MigrationInterface, QueryRunner } from 'typeorm';

export class ImplementacionLikes1744168949358 implements MigrationInterface {
  name = 'ImplementacionLikes1744168949358';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "likes" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" integer, "noticia_id" integer, CONSTRAINT "UQ_4c915ad57563c21d632beaabc7e" UNIQUE ("user_id", "noticia_id"), CONSTRAINT "PK_a9323de3f8bced7539a794b4a37" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes" ADD CONSTRAINT "FK_3f519ed95f775c781a254089171" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes" ADD CONSTRAINT "FK_3474040b92fa74413221536d522" FOREIGN KEY ("noticia_id") REFERENCES "noticias"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "likes" DROP CONSTRAINT "FK_3474040b92fa74413221536d522"`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes" DROP CONSTRAINT "FK_3f519ed95f775c781a254089171"`,
    );
    await queryRunner.query(`DROP TABLE "likes"`);
  }
}
