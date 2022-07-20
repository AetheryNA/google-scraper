import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class keywords1658252193663 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'keywords',
        columns: [
          {
            name: 'id',
            type: 'int',
            isGenerated: true,
            isPrimary: true,
          },
          {
            name: 'userId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'keyword',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'total_ads',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'total_links',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'total_search_results',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'html_of_page',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            isNullable: true,
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            isNullable: true,
            default: 'now()',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'keywords',
      new TableForeignKey({
        columnNames: ['id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
      }),
    );

    await queryRunner.createIndex(
      'keywords',
      new TableIndex({
        name: 'IDX_KEYWORD_ID',
        columnNames: ['id'],
      }),
    );

    await queryRunner.createIndex(
      'keywords',
      new TableIndex({
        name: 'IDX_KEYWORD',
        columnNames: ['keyword'],
      }),
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(_queryRunner: QueryRunner): Promise<void> {}
}
