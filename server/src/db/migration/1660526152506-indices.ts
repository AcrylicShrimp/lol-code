import { MigrationInterface, QueryRunner } from "typeorm";

export class indices1660526152506 implements MigrationInterface {
    name = 'indices1660526152506'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`imageKey\``);
        await queryRunner.query(`ALTER TABLE \`post_comment\` ADD \`index\` int NOT NULL`);
        await queryRunner.query(`CREATE INDEX \`IDX_2c48bb48b9bcf961d9ace3b316\` ON \`post_comment\` (\`index\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_3ecd92135c92eb9662f0e42342\` ON \`post\` (\`writtenAt\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_41823603d5bd733e8477323b17\` ON \`post\` (\`voteCountUpdatedAt\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_41823603d5bd733e8477323b17\` ON \`post\``);
        await queryRunner.query(`DROP INDEX \`IDX_3ecd92135c92eb9662f0e42342\` ON \`post\``);
        await queryRunner.query(`DROP INDEX \`IDX_2c48bb48b9bcf961d9ace3b316\` ON \`post_comment\``);
        await queryRunner.query(`ALTER TABLE \`post_comment\` DROP COLUMN \`index\``);
        await queryRunner.query(`ALTER TABLE \`post\` ADD \`imageKey\` varchar(255) NULL`);
    }

}
