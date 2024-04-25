import { MigrationInterface, QueryRunner } from "typeorm";

export class initial1660523850600 implements MigrationInterface {
    name = 'initial1660523850600'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`post\` (\`id\` int NOT NULL AUTO_INCREMENT, \`content\` varchar(255) NOT NULL, \`code\` text NULL, \`imageKey\` varchar(255) NULL, \`imageURL\` text NULL, \`upvotes\` int NOT NULL DEFAULT '0', \`downvotes\` int NOT NULL DEFAULT '0', \`writtenAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`voteCountUpdatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`post_comment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`ip\` varchar(64) NOT NULL, \`content\` varchar(255) NOT NULL, \`writtenAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`postId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`post_downvote\` (\`postId\` int NOT NULL, \`ip\` varchar(64) NOT NULL, \`writtenAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`postId\`, \`ip\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`post_upvote\` (\`postId\` int NOT NULL, \`ip\` varchar(64) NOT NULL, \`writtenAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`postId\`, \`ip\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`post_comment\` ADD CONSTRAINT \`FK_c7fb3b0d1192f17f7649062f672\` FOREIGN KEY (\`postId\`) REFERENCES \`post\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`post_downvote\` ADD CONSTRAINT \`FK_35874fc2293abe28b68fced5135\` FOREIGN KEY (\`postId\`) REFERENCES \`post\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`post_upvote\` ADD CONSTRAINT \`FK_9497166430ee284c4190c61fe80\` FOREIGN KEY (\`postId\`) REFERENCES \`post\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post_upvote\` DROP FOREIGN KEY \`FK_9497166430ee284c4190c61fe80\``);
        await queryRunner.query(`ALTER TABLE \`post_downvote\` DROP FOREIGN KEY \`FK_35874fc2293abe28b68fced5135\``);
        await queryRunner.query(`ALTER TABLE \`post_comment\` DROP FOREIGN KEY \`FK_c7fb3b0d1192f17f7649062f672\``);
        await queryRunner.query(`DROP TABLE \`post_upvote\``);
        await queryRunner.query(`DROP TABLE \`post_downvote\``);
        await queryRunner.query(`DROP TABLE \`post_comment\``);
        await queryRunner.query(`DROP TABLE \`post\``);
    }

}
