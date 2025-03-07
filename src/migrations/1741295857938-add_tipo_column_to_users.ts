import { Role } from "src/config/enums/roles.enum";
import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddTipoColumnToUsers1741295857938 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.addColumn('users', new TableColumn({
            name: 'tipo',
            type: 'varchar',
            length: '50',
            isNullable: false,
            default: Role.ESTANDAR,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'tipo');
    }

}
