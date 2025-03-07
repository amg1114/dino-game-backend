import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddTipoColumnToUsers1741295857938 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Verificar si la tabla 'users' existe en la base de datos
    const tableExist = await queryRunner.query(`
            SELECT to_regclass('public.users');
        `);

    // Si la tabla 'users' existe, se agrega la columna 'tipo'
    if (tableExist[0].to_regclass) {
      await queryRunner.addColumn(
        'users',
        new TableColumn({
          name: 'tipo',
          type: 'varchar',
          length: '50',
          isNullable: false,
        }),
      );
    } else {
      console.error('La tabla "users" no existe en la base de datos.');
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Verificar si la columna 'tipo' existe antes de eliminarla
    const columnExist = await queryRunner.query(`
            SELECT column_name
            FROM information_schema.columns
            WHERE table_name = 'users' AND column_name = 'tipo'
        `);

    // Si la columna 'tipo' existe, se elimina
    if (columnExist.length > 0) {
      await queryRunner.dropColumn('users', 'tipo');
    }
  }
}
