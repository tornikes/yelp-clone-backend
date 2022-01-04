import { MigrationInterface, QueryRunner } from "typeorm";

export class UserEntity1641306590906 implements MigrationInterface {
  name = "UserEntity1641306590906";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" character varying NOT NULL, "userName" character varying(100) NOT NULL, "email" character varying(100) NOT NULL, "passwordHash" character varying(100) NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
