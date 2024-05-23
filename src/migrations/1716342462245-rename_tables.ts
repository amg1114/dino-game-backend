import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameTables1716342462245 implements MigrationInterface {
    name = 'RenameTables1716342462245'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categorias_videogames" ("categoriasId" integer NOT NULL, "videogamesId" integer NOT NULL, CONSTRAINT "PK_4a8cf50bfbb7d13d3d2caa57ebc" PRIMARY KEY ("categoriasId", "videogamesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_bc74157fda8c1a8c1b1e305657" ON "categorias_videogames" ("categoriasId") `);
        await queryRunner.query(`CREATE INDEX "IDX_92734b13ae86b04fe9ae8ff5ba" ON "categorias_videogames" ("videogamesId") `);
        await queryRunner.query(`ALTER TABLE "categorias_videogames" ADD CONSTRAINT "FK_bc74157fda8c1a8c1b1e305657d" FOREIGN KEY ("categoriasId") REFERENCES "categorias"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "categorias_videogames" ADD CONSTRAINT "FK_92734b13ae86b04fe9ae8ff5bad" FOREIGN KEY ("videogamesId") REFERENCES "videogames"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categorias_videogames" DROP CONSTRAINT "FK_92734b13ae86b04fe9ae8ff5bad"`);
        await queryRunner.query(`ALTER TABLE "categorias_videogames" DROP CONSTRAINT "FK_bc74157fda8c1a8c1b1e305657d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_92734b13ae86b04fe9ae8ff5ba"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bc74157fda8c1a8c1b1e305657"`);
        await queryRunner.query(`DROP TABLE "categorias_videogames"`);
    }

}
