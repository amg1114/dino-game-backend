import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class RemoveTablesAdministratorsDevelopers1741294973448
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Verificar si la tabla "videogames" existe antes de intentar eliminar la restricción
    const foreignKeyExist = await queryRunner.query(`
            SELECT conname 
            FROM pg_constraint 
            WHERE conname = 'FK_8689717bf54cfb45835aabe7cdc'
        `);

    // Si la restricción existe, se elimina
    if (foreignKeyExist.length > 0) {
      await queryRunner.query(
        `ALTER TABLE "videogames" DROP CONSTRAINT IF EXISTS "FK_8689717bf54cfb45835aabe7cdc"`,
      );
    }

    // Verificar si las tablas "administrators" y "developers" existen antes de intentar eliminarlas
    const administratorsExist = await queryRunner.query(`
            SELECT to_regclass('public.administrators')
        `);

    const developersExist = await queryRunner.query(`
            SELECT to_regclass('public.developers')
        `);

    // Si las tablas existen, se eliminan
    if (administratorsExist[0].to_regclass) {
      await queryRunner.dropTable('administrators');
    }

    if (developersExist[0].to_regclass) {
      await queryRunner.dropTable('developers');
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Crear las tablas "administrators" y "developers" si no existen
    await queryRunner.createTable(
      new Table({
        name: 'administrators',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'developers',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
        ],
      }),
    );

    // Crear la restricción de clave foránea si no existe
    const foreignKeyExist = await queryRunner.query(`
            SELECT conname 
            FROM pg_constraint 
            WHERE conname = 'FK_8689717bf54cfb45835aabe7cdc'
        `);

    if (foreignKeyExist.length === 0) {
      await queryRunner.createForeignKey(
        'videogames',
        new TableForeignKey({
          columnNames: ['developer_id'],
          referencedTableName: 'developers',
          referencedColumnNames: ['id'],
          onDelete: 'CASCADE',
        }),
      );
    }
  }
}
