import { MigrationInterface, QueryRunner } from 'typeorm';

export class TypeReportsSeed1750015354142 implements MigrationInterface {
  name = 'TypeReportsSeed1750015354142';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`TRUNCATE TABLE type_reports CASCADE;`);

    await queryRunner.query(`
      INSERT INTO type_reports (id, title, description, created_at)
      VALUES
        (1, 'Bug', 'Reportar un fallo del sistema', NOW()),
        (2, 'Abuso', 'Reportar abuso o acoso entre usuarios', NOW()),
        (3, 'Contenido', 'Reportar contenido inapropiado', NOW()),
        (4, 'Spam', 'Reportar mensajes o publicaciones no deseadas', NOW()),
        (5, 'Trampa', 'Reportar uso de trampas o hacks', NOW()),
        (6, 'Fraude', 'Reportar actividad sospechosa o fraudulenta', NOW());
    `);

    await queryRunner.query(`
      SELECT setval('public.type_reports_id_seq', (SELECT MAX(id) FROM type_reports) + 1);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `TRUNCATE TABLE type_reports RESTART IDENTITY CASCADE;`,
    );
  }
}
