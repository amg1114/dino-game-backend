import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableUnique,
} from 'typeorm';

export class CrearTablaLikes1743808456976 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'likes',
        columns: [
          {
            name: 'id',
            type: 'serial',
            isPrimary: true,
          },
          {
            name: 'user_id',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'noticia_id',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'fecha',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'hora',
            type: 'time',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    await queryRunner.createUniqueConstraint(
      'likes',
      new TableUnique({
        name: 'UQ_user_news_like',
        columnNames: ['user_id', 'noticia_id'],
      }),
    ),
      await queryRunner.createForeignKey(
        'likes',
        new TableForeignKey({
          columnNames: ['user_id'],
          referencedTableName: 'users',
          referencedColumnNames: ['id'],
          onDelete: 'CASCADE',
        }),
      );

    await queryRunner.createForeignKey(
      'likes',
      new TableForeignKey({
        columnNames: ['noticia_id'],
        referencedTableName: 'noticias',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('likes');
  }
}
