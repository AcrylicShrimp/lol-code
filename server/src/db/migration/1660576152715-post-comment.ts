import { MigrationInterface, QueryRunner } from "typeorm";

export class postComment1660576152715 implements MigrationInterface {
    name = 'postComment1660576152715'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_2c48bb48b9bcf961d9ace3b316\` ON \`post_comment\``);
        await queryRunner.query(`ALTER TABLE \`post_comment\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`post_comment\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`post_comment\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`post_comment\` ADD PRIMARY KEY (\`postId\`, \`index\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post_comment\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`post_comment\` ADD \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`post_comment\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`post_comment\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`CREATE INDEX \`IDX_2c48bb48b9bcf961d9ace3b316\` ON \`post_comment\` (\`index\`)`);
    }

}
