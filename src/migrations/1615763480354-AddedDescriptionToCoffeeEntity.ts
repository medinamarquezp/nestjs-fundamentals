import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedDescriptionToCoffeeEntity1615763480354 implements MigrationInterface {
  name = 'AddedDescriptionToCoffeeEntity1615763480354';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "flavour" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "coffees" json, CONSTRAINT "PK_ad41d76f211fe58a8f4343db332" PRIMARY KEY ("id"))`);
    await queryRunner.query(`ALTER TABLE "coffee" ADD "description" character varying`);
    await queryRunner.query(`CREATE INDEX "IDX_b535fbe8ec6d832dde22065ebd" ON "event" ("name") `);
    await queryRunner.query(`CREATE INDEX "IDX_d7fdd8dfe8ac35394c30262af4" ON "event" ("type", "payload") `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_d7fdd8dfe8ac35394c30262af4"`);
    await queryRunner.query(`DROP INDEX "IDX_b535fbe8ec6d832dde22065ebd"`);
    await queryRunner.query(`ALTER TABLE "coffee" DROP COLUMN "description"`);
    await queryRunner.query(`DROP TABLE "flavour"`);
  }

}
