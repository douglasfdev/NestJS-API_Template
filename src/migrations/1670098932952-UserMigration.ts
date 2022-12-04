import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserMigration1670098932952 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "password" to "senha"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "senha" to "password"`,
    );
  }
}
