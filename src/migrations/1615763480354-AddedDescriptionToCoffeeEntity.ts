import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedDescriptionToCoffeeEntity1615763480354 implements MigrationInterface {
  name = 'AddedDescriptionToCoffeeEntity1615763480354';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "coffee" ADD "description" character varying`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "coffee" DROP COLUMN "description"`);
  }
}
