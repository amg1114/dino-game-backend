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
    const foreignKeyExist = await queryRunner.query(`
            SELECT conname 
            FROM pg_constraint 
            WHERE conname = 'FK_8689717bf54cfb45835aabe7cdc'
        `);

    if (foreignKeyExist.length > 0) {
      await queryRunner.query(
        `ALTER TABLE "videogames" DROP CONSTRAINT IF EXISTS "FK_8689717bf54cfb45835aabe7cdc"`,
      );
    }

    const administratorsExist = await queryRunner.query(`
            SELECT to_regclass('public.administrators')
        `);

    const developersExist = await queryRunner.query(`
            SELECT to_regclass('public.developers')
        `);

    if (administratorsExist[0].to_regclass) {
      await queryRunner.dropTable('administrators');
    }

    if (developersExist[0].to_regclass) {
      await queryRunner.dropTable('developers');
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
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
