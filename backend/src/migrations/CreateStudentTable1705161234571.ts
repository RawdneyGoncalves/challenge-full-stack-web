import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateStudentTable1705161234571 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "student",
        columns: [
          {
            name: "id",
            type: "serial",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "email",
            type: "varchar",
            isUnique: true,
            isNullable: false,
          },
          {
            name: "ra",
            type: "varchar",
            isUnique: true,
            isNullable: false,
          },
          {
            name: "cpf",
            type: "varchar",
            isUnique: true,
            isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
            onUpdate: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("student");
  }
}
