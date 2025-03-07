import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class RemoveTablesAdministratorsDevelopers1741294973448 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('administrators');
        await queryRunner.dropTable('developers');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
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
        }));

        await queryRunner.createTable(new Table({
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
        }));
    }

}
