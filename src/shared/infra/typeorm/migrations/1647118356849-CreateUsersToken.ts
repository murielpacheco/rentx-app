import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateUsersToken1647118356849 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "users_tokens",
				columns: [
					{
						name: "id",
						type: "uuid",
						isPrimary: true,
					},
					{
						name: "refresh_token",
						type: "varchar",
					},
					{
						name: "user_id",
						type: "uuid",
					},
					{
						name: "expires_at",
						type: "timestamp",
					},
					{
						name: "created_at",
						type: "timestamp",
						default: "now()",
					}
				]
			})
		);
        
		await queryRunner.createForeignKey(
			"rentals",
			new TableForeignKey({
				name: "FKuserToken",
				referencedTableName: "users",
				referencedColumnNames: ["id"],
				columnNames: ["user_id"],
				onDelete: "CASCADE",
				onUpdate: "CASCADE"
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey("users_tokens", "FKuserToken");
		await queryRunner.dropTable("users_tokens");
	}

}
