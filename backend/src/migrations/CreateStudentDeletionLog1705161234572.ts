import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateStudentDeletionLog1705161234572 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "student_deletion_log",
        columns: [
          {
            name: "id",
            type: "serial",
            isPrimary: true,
          },
          {
            name: "student_id",
            type: "int",
            isNullable: false,
          },
          {
            name: "deleted_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            columnNames: ["student_id"],
            referencedTableName: "student",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("student_deletion_log");
  }
}
