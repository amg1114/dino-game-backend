import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddTipoColumnToUsers1741295857938 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const tableExist = await queryRunner.query(`
            SELECT to_regclass('public.users');
        `);

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
    const columnExist = await queryRunner.query(`
            SELECT column_name
            FROM information_schema.columns
            WHERE table_name = 'users' AND column_name = 'tipo'
        `);

    if (columnExist.length > 0) {
      await queryRunner.dropColumn('users', 'tipo');
    }
  }
}
