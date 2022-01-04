import { MigrationInterface, QueryRunner } from "typeorm";

export class UsersEntity1641308836491 implements MigrationInterface {
  name = "UsersEntity1641308836491";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" character varying NOT NULL, "userName" character varying(100) NOT NULL, "email" character varying(100) NOT NULL, "passwordHash" character varying(100) NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
