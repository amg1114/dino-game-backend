import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1741315595782 implements MigrationInterface {
  name = 'Init1741315595782';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "categorias" ("id" SERIAL NOT NULL, "titulo" character varying NOT NULL, "descripcion" character varying, CONSTRAINT "PK_3886a26251605c571c6b4f861fe" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_videogames" ("id" SERIAL NOT NULL, "fecha_compra" date NOT NULL, "precio" double precision NOT NULL DEFAULT '0', "user_id" integer, "video_game_id" integer, CONSTRAINT "PK_a5492fed697d54bf927459f5cc0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_sexo_enum" AS ENUM('M', 'F', 'D')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "fecha_nacimiento" date NOT NULL, "sexo" "public"."users_sexo_enum" NOT NULL DEFAULT 'D', "pais" character varying NOT NULL, "correo" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_d3cf8c651c0e94ea522b61ca3ac" UNIQUE ("correo"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "administrators" ("id" integer NOT NULL, CONSTRAINT "PK_aaa48522d99c3b6b33fdea7dc2f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "developers" ("id" integer NOT NULL, CONSTRAINT "PK_247719240b950bd26dec14bdd21" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "descuentos" ("id" SERIAL NOT NULL, "porcentaje" double precision NOT NULL, "fecha_inicio" date NOT NULL, "fecha_fin" date NOT NULL, "video_game_id" integer, CONSTRAINT "PK_720a8b3056b8ac5255e72c46cac" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "versions" ("id" SERIAL NOT NULL, "version" character varying NOT NULL, "descripcion" character varying NOT NULL, "size" character varying NOT NULL, "release_date" TIMESTAMP NOT NULL, "url" character varying NOT NULL, "video_game_id" integer, CONSTRAINT "PK_921e9a820c96cc2cd7d4b3a107b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "requisitos" ("id" SERIAL NOT NULL, "requisito" character varying NOT NULL, "version_id" integer, CONSTRAINT "PK_b0417b3952ffc430e14dc488406" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "videogames" ("id" SERIAL NOT NULL, "precio" double precision NOT NULL, "titulo" character varying NOT NULL, "descripcion" character varying, "fecha_lanzamiento" date NOT NULL, "developer_id" integer, CONSTRAINT "PK_50e823003a124537e90c6e52422" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "assets" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "url" character varying NOT NULL, "index" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_da96729a8b113377cfb6a62439c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "assets_videogames" ("asset_id" integer NOT NULL, "assetID" integer, "video_game_id" integer, CONSTRAINT "REL_c0c80001f2aa8fc0022d2cf54c" UNIQUE ("assetID"), CONSTRAINT "PK_cd1b8bb3b61608299792604a18f" PRIMARY KEY ("asset_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "assets_noticias" ("asset_id" integer NOT NULL, "assetID" integer, "noticia_id" integer, CONSTRAINT "REL_0d7ad6ed800f1a4116aa771cad" UNIQUE ("assetID"), CONSTRAINT "PK_59131e5e5e1fd0a58dbb39dd65e" PRIMARY KEY ("asset_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "noticias" ("id" SERIAL NOT NULL, "titulo" character varying NOT NULL, "descripcion" character varying NOT NULL, "fecha" TIMESTAMP NOT NULL, "autor_id" integer, CONSTRAINT "PK_526a107301fc9dfe8d836d6cf27" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."solicitudes-desarrollador_estado_enum" AS ENUM('0', '1', '2')`,
    );
    await queryRunner.query(
      `CREATE TABLE "solicitudes-desarrollador" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "mensaje" character varying NOT NULL, "estado" "public"."solicitudes-desarrollador_estado_enum" NOT NULL DEFAULT '0', "user_id" integer, CONSTRAINT "REL_32ddd4e1ccb047cca6799de935" UNIQUE ("user_id"), CONSTRAINT "PK_fc839c23407597483b88fb1908a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "categorias_videogames" ("categorias_id" integer NOT NULL, "videogames_id" integer NOT NULL, CONSTRAINT "PK_c6552ff8a47edc349ffffc61417" PRIMARY KEY ("categorias_id", "videogames_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_134f38de20d8ad6e940d658f33" ON "categorias_videogames" ("categorias_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_418643310111547c1c65a2ff2c" ON "categorias_videogames" ("videogames_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "user_videogames" ADD CONSTRAINT "FK_1feb7f9c1e1acc6949028ff0c87" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_videogames" ADD CONSTRAINT "FK_880d9a61986fb6d95732b189c10" FOREIGN KEY ("video_game_id") REFERENCES "videogames"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "administrators" ADD CONSTRAINT "FK_aaa48522d99c3b6b33fdea7dc2f" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "developers" ADD CONSTRAINT "FK_247719240b950bd26dec14bdd21" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "descuentos" ADD CONSTRAINT "FK_ead9953c9d984eda14c9e6684d5" FOREIGN KEY ("video_game_id") REFERENCES "videogames"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "versions" ADD CONSTRAINT "FK_bf11a40d76a080dc7a561ba8aa0" FOREIGN KEY ("video_game_id") REFERENCES "videogames"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "requisitos" ADD CONSTRAINT "FK_bd045fb1cbb7f06e95d1b90fe5a" FOREIGN KEY ("version_id") REFERENCES "versions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "videogames" ADD CONSTRAINT "FK_8689717bf54cfb45835aabe7cdc" FOREIGN KEY ("developer_id") REFERENCES "developers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "assets_videogames" ADD CONSTRAINT "FK_c0c80001f2aa8fc0022d2cf54c7" FOREIGN KEY ("assetID") REFERENCES "assets"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "assets_videogames" ADD CONSTRAINT "FK_2c9020e0264563e0bfc829f9774" FOREIGN KEY ("video_game_id") REFERENCES "videogames"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "assets_noticias" ADD CONSTRAINT "FK_0d7ad6ed800f1a4116aa771cad2" FOREIGN KEY ("assetID") REFERENCES "assets"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "assets_noticias" ADD CONSTRAINT "FK_cdc0e439f69d433fc426d3184d4" FOREIGN KEY ("noticia_id") REFERENCES "noticias"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "noticias" ADD CONSTRAINT "FK_2ca80788b0f4035255fef63f4c6" FOREIGN KEY ("autor_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "solicitudes-desarrollador" ADD CONSTRAINT "FK_32ddd4e1ccb047cca6799de9352" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "categorias_videogames" ADD CONSTRAINT "FK_134f38de20d8ad6e940d658f33a" FOREIGN KEY ("categorias_id") REFERENCES "categorias"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "categorias_videogames" ADD CONSTRAINT "FK_418643310111547c1c65a2ff2cb" FOREIGN KEY ("videogames_id") REFERENCES "videogames"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "categorias_videogames" DROP CONSTRAINT "FK_418643310111547c1c65a2ff2cb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "categorias_videogames" DROP CONSTRAINT "FK_134f38de20d8ad6e940d658f33a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "solicitudes-desarrollador" DROP CONSTRAINT "FK_32ddd4e1ccb047cca6799de9352"`,
    );
    await queryRunner.query(
      `ALTER TABLE "noticias" DROP CONSTRAINT "FK_2ca80788b0f4035255fef63f4c6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "assets_noticias" DROP CONSTRAINT "FK_cdc0e439f69d433fc426d3184d4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "assets_noticias" DROP CONSTRAINT "FK_0d7ad6ed800f1a4116aa771cad2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "assets_videogames" DROP CONSTRAINT "FK_2c9020e0264563e0bfc829f9774"`,
    );
    await queryRunner.query(
      `ALTER TABLE "assets_videogames" DROP CONSTRAINT "FK_c0c80001f2aa8fc0022d2cf54c7"`,
    );
    //    await queryRunner.query(
    //      `ALTER TABLE "videogames" DROP CONSTRAINT "FK_8689717bf54cfb45835aabe7cdc"`,
    //    );
    await queryRunner.query(
      `ALTER TABLE "requisitos" DROP CONSTRAINT "FK_bd045fb1cbb7f06e95d1b90fe5a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "versions" DROP CONSTRAINT "FK_bf11a40d76a080dc7a561ba8aa0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "descuentos" DROP CONSTRAINT "FK_ead9953c9d984eda14c9e6684d5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "developers" DROP CONSTRAINT "FK_247719240b950bd26dec14bdd21"`,
    );
    await queryRunner.query(
      `ALTER TABLE "administrators" DROP CONSTRAINT "FK_aaa48522d99c3b6b33fdea7dc2f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_videogames" DROP CONSTRAINT "FK_880d9a61986fb6d95732b189c10"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_videogames" DROP CONSTRAINT "FK_1feb7f9c1e1acc6949028ff0c87"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_418643310111547c1c65a2ff2c"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_134f38de20d8ad6e940d658f33"`,
    );
    await queryRunner.query(`DROP TABLE "categorias_videogames"`);
    await queryRunner.query(`DROP TABLE "solicitudes-desarrollador"`);
    await queryRunner.query(
      `DROP TYPE "public"."solicitudes-desarrollador_estado_enum"`,
    );
    await queryRunner.query(`DROP TABLE "noticias"`);
    await queryRunner.query(`DROP TABLE "assets_noticias"`);
    await queryRunner.query(`DROP TABLE "assets_videogames"`);
    await queryRunner.query(`DROP TABLE "assets"`);
    await queryRunner.query(`DROP TABLE "videogames"`);
    await queryRunner.query(`DROP TABLE "requisitos"`);
    await queryRunner.query(`DROP TABLE "versions"`);
    await queryRunner.query(`DROP TABLE "descuentos"`);
    await queryRunner.query(`DROP TABLE "developers"`);
    await queryRunner.query(`DROP TABLE "administrators"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_sexo_enum"`);
    await queryRunner.query(`DROP TABLE "user_videogames"`);
    await queryRunner.query(`DROP TABLE "categorias"`);
  }
}
