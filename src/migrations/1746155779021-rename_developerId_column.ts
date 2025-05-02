import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameDeveloperIdColumn1746155779021
  implements MigrationInterface
{
  name = 'RenameDeveloperIdColumn1746155779021';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "videogames" DROP CONSTRAINT "FK_4cc6319d9e418cb80ae9a7a339c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "videogames" DROP CONSTRAINT "FK_videogames_developer"`,
    );
    await queryRunner.query(
      `ALTER TABLE "videogames" RENAME COLUMN "developerId" TO "developer_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "videogames" ADD CONSTRAINT "FK_8689717bf54cfb45835aabe7cdc" FOREIGN KEY ("developer_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "videogames" DROP CONSTRAINT "FK_8689717bf54cfb45835aabe7cdc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "videogames" RENAME COLUMN "developer_id" TO "developerId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "videogames" ADD CONSTRAINT "FK_videogames_developer" FOREIGN KEY ("developerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "videogames" ADD CONSTRAINT "FK_4cc6319d9e418cb80ae9a7a339c" FOREIGN KEY ("developerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
