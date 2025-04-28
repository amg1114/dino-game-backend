import slugify from 'slugify';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AgregarColumnaSlug1742671992403 implements MigrationInterface {
  name = 'AgregarColumnaSlug1742671992403';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "noticias" ADD "slug" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "noticias" ADD CONSTRAINT "UQ_8b6a1631530f1d3acc047b32fe2" UNIQUE ("slug")`,
    );
    await queryRunner.query(
      `ALTER TABLE "videogames" ADD "slug" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "videogames" ADD CONSTRAINT "UQ_26e8807f984340d2f5d4a48b3bb" UNIQUE ("slug")`,
    );
    await queryRunner.query(
      `ALTER TABLE "categorias" ADD "slug" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "categorias" ADD CONSTRAINT "UQ_d7c32fbaefae4a73773e52c3165" UNIQUE ("slug")`,
    );

    const videoGames = await queryRunner.query(
      `SELECT id, titulo FROM "videogames"`,
    );
    for (const game of videoGames) {
      const slug = slugify(game.titulo, {
        strict: true,
        lower: true,
        trim: true,
      });
      await queryRunner.query(
        `UPDATE "videogames" SET "slug" = '${slug}' WHERE id = ${game.id}`,
      );
    }

    const noticias = await queryRunner.query(
      `SELECT id, titulo FROM "noticias"`,
    );
    for (const noticia of noticias) {
      const slug = slugify(noticia.titulo, {
        strict: true,
        lower: true,
        trim: true,
      });
      await queryRunner.query(
        `UPDATE "noticias" SET "slug" = '${slug}' WHERE id = ${noticia.id}`,
      );
    }

    const categorias = await queryRunner.query(
      `SELECT id, titulo FROM "categorias"`,
    );
    for (const categoria of categorias) {
      const slug = slugify(categoria.titulo, {
        strict: true,
        lower: true,
        trim: true,
      });
      await queryRunner.query(
        `UPDATE "categorias" SET "slug" = '${slug}' WHERE id = ${categoria.id}`,
      );
    }

    await queryRunner.query(
      `ALTER TABLE "videogames" ALTER COLUMN "slug" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "noticias" ALTER COLUMN "slug" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "categorias" ALTER COLUMN "slug" SET NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "categorias" DROP CONSTRAINT "UQ_d7c32fbaefae4a73773e52c3165"`,
    );
    await queryRunner.query(`ALTER TABLE "categorias" DROP COLUMN "slug"`);
    await queryRunner.query(
      `ALTER TABLE "videogames" DROP CONSTRAINT "UQ_26e8807f984340d2f5d4a48b3bb"`,
    );
    await queryRunner.query(`ALTER TABLE "videogames" DROP COLUMN "slug"`);
    await queryRunner.query(
      `ALTER TABLE "noticias" DROP CONSTRAINT "UQ_8b6a1631530f1d3acc047b32fe2"`,
    );
    await queryRunner.query(`ALTER TABLE "noticias" DROP COLUMN "slug"`);
  }
}
