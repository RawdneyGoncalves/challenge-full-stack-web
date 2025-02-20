import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddRefreshTokenToUser1705161234571 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "user",
      new TableColumn({
        name: "refreshToken",
        type: "varchar",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("user", "refreshToken");
  }
}