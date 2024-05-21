import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1716256444393 implements MigrationInterface {
    name = 'Init1716256444393'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categorias" ("id" SERIAL NOT NULL, "titulo" character varying NOT NULL, "descripcion" character varying, CONSTRAINT "PK_3886a26251605c571c6b4f861fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_videogames" ("id" SERIAL NOT NULL, "fechaCompra" date NOT NULL, "precio" double precision NOT NULL DEFAULT '0', "userId" integer, "videoGameId" integer, CONSTRAINT "PK_a5492fed697d54bf927459f5cc0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "fechaNacimiento" date NOT NULL, "sexo" "public"."users_sexo_enum" NOT NULL DEFAULT 'D', "pais" character varying NOT NULL, "correo" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_d3cf8c651c0e94ea522b61ca3ac" UNIQUE ("correo"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "administrators" ("id" integer NOT NULL, CONSTRAINT "PK_aaa48522d99c3b6b33fdea7dc2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "developers" ("id" integer NOT NULL, CONSTRAINT "PK_247719240b950bd26dec14bdd21" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "descuentos" ("id" SERIAL NOT NULL, "porcentaje" double precision NOT NULL, "fechaInicio" date NOT NULL, "fechaFin" date NOT NULL, "videoGameId" integer, CONSTRAINT "PK_720a8b3056b8ac5255e72c46cac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "versions" ("id" SERIAL NOT NULL, "version" character varying NOT NULL, "size" character varying NOT NULL, "releaseDate" TIMESTAMP NOT NULL, "url" character varying NOT NULL, "videoGameId" integer, CONSTRAINT "PK_921e9a820c96cc2cd7d4b3a107b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "requisitos" ("id" SERIAL NOT NULL, "requisito" character varying NOT NULL, "versionId" integer, CONSTRAINT "PK_b0417b3952ffc430e14dc488406" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "videogames" ("id" SERIAL NOT NULL, "precio" double precision NOT NULL, "titulo" character varying NOT NULL, "descripcion" character varying, "fechaLanzamiento" date NOT NULL, "developerId" integer, CONSTRAINT "PK_50e823003a124537e90c6e52422" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "assets" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "url" character varying NOT NULL, "index" integer NOT NULL DEFAULT '0', "videoGameId" integer, "noticiaId" integer, CONSTRAINT "PK_da96729a8b113377cfb6a62439c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "noticias" ("id" SERIAL NOT NULL, "titulo" character varying NOT NULL, "descripcion" character varying NOT NULL, "fecha" TIMESTAMP NOT NULL, "autorId" integer, CONSTRAINT "PK_526a107301fc9dfe8d836d6cf27" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "solicitudes-desarrollador" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "mensaje" character varying NOT NULL, "estado" "public"."solicitudes-desarrollador_estado_enum" NOT NULL DEFAULT '0', "userId" integer, CONSTRAINT "REL_60f7fc523e314b2bbc8004ad69" UNIQUE ("userId"), CONSTRAINT "PK_fc839c23407597483b88fb1908a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categorias_video-games" ("categoriasId" integer NOT NULL, "videogamesId" integer NOT NULL, CONSTRAINT "PK_f6b56d110a928e998687a1c943d" PRIMARY KEY ("categoriasId", "videogamesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a15c7999bdd6aad7aacdf0e216" ON "categorias_video-games" ("categoriasId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b4299862ab8711922b357cae36" ON "categorias_video-games" ("videogamesId") `);
        await queryRunner.query(`ALTER TABLE "user_videogames" ADD CONSTRAINT "FK_5cbb86dbbb962da26c3df5cdf85" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_videogames" ADD CONSTRAINT "FK_8ceb6b79b163f9d6d447b3d93b6" FOREIGN KEY ("videoGameId") REFERENCES "videogames"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "administrators" ADD CONSTRAINT "FK_aaa48522d99c3b6b33fdea7dc2f" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "developers" ADD CONSTRAINT "FK_247719240b950bd26dec14bdd21" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "descuentos" ADD CONSTRAINT "FK_d6e4527cdb3829127101581565f" FOREIGN KEY ("videoGameId") REFERENCES "videogames"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "versions" ADD CONSTRAINT "FK_509b1fe711ab2e65fed98fb4c2f" FOREIGN KEY ("videoGameId") REFERENCES "videogames"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "requisitos" ADD CONSTRAINT "FK_ea850becd81e2ebffef071266c1" FOREIGN KEY ("versionId") REFERENCES "versions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "videogames" ADD CONSTRAINT "FK_4cc6319d9e418cb80ae9a7a339c" FOREIGN KEY ("developerId") REFERENCES "developers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "assets" ADD CONSTRAINT "FK_0bb7edbd09b4aa966aefe16804f" FOREIGN KEY ("videoGameId") REFERENCES "videogames"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "assets" ADD CONSTRAINT "FK_63425209d7df95d1e6c6918b281" FOREIGN KEY ("noticiaId") REFERENCES "noticias"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "noticias" ADD CONSTRAINT "FK_03430c96cac5b5dfd6cc8221be5" FOREIGN KEY ("autorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "solicitudes-desarrollador" ADD CONSTRAINT "FK_60f7fc523e314b2bbc8004ad691" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "categorias_video-games" ADD CONSTRAINT "FK_a15c7999bdd6aad7aacdf0e216c" FOREIGN KEY ("categoriasId") REFERENCES "categorias"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "categorias_video-games" ADD CONSTRAINT "FK_b4299862ab8711922b357cae365" FOREIGN KEY ("videogamesId") REFERENCES "videogames"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categorias_video-games" DROP CONSTRAINT "FK_b4299862ab8711922b357cae365"`);
        await queryRunner.query(`ALTER TABLE "categorias_video-games" DROP CONSTRAINT "FK_a15c7999bdd6aad7aacdf0e216c"`);
        await queryRunner.query(`ALTER TABLE "solicitudes-desarrollador" DROP CONSTRAINT "FK_60f7fc523e314b2bbc8004ad691"`);
        await queryRunner.query(`ALTER TABLE "noticias" DROP CONSTRAINT "FK_03430c96cac5b5dfd6cc8221be5"`);
        await queryRunner.query(`ALTER TABLE "assets" DROP CONSTRAINT "FK_63425209d7df95d1e6c6918b281"`);
        await queryRunner.query(`ALTER TABLE "assets" DROP CONSTRAINT "FK_0bb7edbd09b4aa966aefe16804f"`);
        await queryRunner.query(`ALTER TABLE "videogames" DROP CONSTRAINT "FK_4cc6319d9e418cb80ae9a7a339c"`);
        await queryRunner.query(`ALTER TABLE "requisitos" DROP CONSTRAINT "FK_ea850becd81e2ebffef071266c1"`);
        await queryRunner.query(`ALTER TABLE "versions" DROP CONSTRAINT "FK_509b1fe711ab2e65fed98fb4c2f"`);
        await queryRunner.query(`ALTER TABLE "descuentos" DROP CONSTRAINT "FK_d6e4527cdb3829127101581565f"`);
        await queryRunner.query(`ALTER TABLE "developers" DROP CONSTRAINT "FK_247719240b950bd26dec14bdd21"`);
        await queryRunner.query(`ALTER TABLE "administrators" DROP CONSTRAINT "FK_aaa48522d99c3b6b33fdea7dc2f"`);
        await queryRunner.query(`ALTER TABLE "user_videogames" DROP CONSTRAINT "FK_8ceb6b79b163f9d6d447b3d93b6"`);
        await queryRunner.query(`ALTER TABLE "user_videogames" DROP CONSTRAINT "FK_5cbb86dbbb962da26c3df5cdf85"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b4299862ab8711922b357cae36"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a15c7999bdd6aad7aacdf0e216"`);
        await queryRunner.query(`DROP TABLE "categorias_video-games"`);
        await queryRunner.query(`DROP TABLE "solicitudes-desarrollador"`);
        await queryRunner.query(`DROP TABLE "noticias"`);
        await queryRunner.query(`DROP TABLE "assets"`);
        await queryRunner.query(`DROP TABLE "videogames"`);
        await queryRunner.query(`DROP TABLE "requisitos"`);
        await queryRunner.query(`DROP TABLE "versions"`);
        await queryRunner.query(`DROP TABLE "descuentos"`);
        await queryRunner.query(`DROP TABLE "developers"`);
        await queryRunner.query(`DROP TABLE "administrators"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "user_videogames"`);
        await queryRunner.query(`DROP TABLE "categorias"`);
    }

}
