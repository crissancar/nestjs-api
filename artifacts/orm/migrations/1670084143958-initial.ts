import { MigrationInterface, QueryRunner } from "typeorm";

export class initial1670084143958 implements MigrationInterface {
    name = 'initial1670084143958'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Admin user
        await queryRunner.query(`CREATE TYPE "public"."admin_user_audiences_enum" AS ENUM('GENERAL', 'ADMIN')`);
        await queryRunner.query(`CREATE TABLE "admin_user" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "audience" "public"."admin_user_audiences_enum" NOT NULL DEFAULT 'GENERAL', CONSTRAINT "UQ_840ac5cd67be99efa5cd989bf9f" UNIQUE ("email"), CONSTRAINT "PK_a28028ba709cd7e5053a86857b4" PRIMARY KEY ("id"))`);

        // Api key
        await queryRunner.query(`CREATE TYPE "public"."api_key_audiences_enum" AS ENUM('GENERAL', 'ADMIN')`);
        await queryRunner.query(`CREATE TABLE "api_key" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "client" character varying NOT NULL, "description" character varying NOT NULL, "key" character varying NOT NULL, "audience" "public"."api_key_audiences_enum" NOT NULL DEFAULT 'GENERAL', CONSTRAINT "UQ_fb080786c16de6ace7ed0b69f7d" UNIQUE ("key"), CONSTRAINT "PK_b1bd840641b8acbaad89c3d8d11" PRIMARY KEY ("id"))`);

        // Blacklist IP
        await queryRunner.query(`CREATE TABLE "blacklist_ip" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "ip" character varying NOT NULL, CONSTRAINT "UQ_c0db2a7e2407e50770f3c590996" UNIQUE ("ip"), CONSTRAINT "PK_8709b6d8a0c8cbfd0d805a3f101" PRIMARY KEY ("id"))`);

        // Blacklist User
        await queryRunner.query(`CREATE TABLE "blacklist_user" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "reason" character varying NOT NULL, "userId" character varying NOT NULL, CONSTRAINT "UQ_6de082a6820994ccb2520774961" UNIQUE ("userId"), CONSTRAINT "PK_737fd64e4d088f113eae9a232cd" PRIMARY KEY ("id"))`);

        // User
        await queryRunner.query(
          `CREATE TYPE "public"."user_audiences_enum" AS ENUM('GENERAL', 'ADMIN')`,
        );
        await queryRunner.query(
          `CREATE TABLE "user" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" character varying NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "audiences" "public"."user_audiences_enum" array NOT NULL DEFAULT '{GENERAL}', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
        );

        // Policy
        await queryRunner.query(`CREATE TYPE "public"."policy_type_enum" AS ENUM('COOKIES', 'PRIVACY', 'TERMS_AND_CONDITIONS')`);
        await queryRunner.query(`CREATE TYPE "public"."policy_language_enum" AS ENUM('EN', 'ES')`);
        await queryRunner.query(`CREATE TABLE "policy" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL DEFAULT 'Default policy description', "type" "public"."policy_type_enum" NOT NULL, "language" "public"."policy_language_enum" NOT NULL, CONSTRAINT "PK_9917b0c5e4286703cc656b1d39f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_7082b7f6b1a9f66e4884714685" ON "policy" ("language", "type") `);

        // FAQ
        await queryRunner.query(`CREATE TYPE "public"."faq_language_enum" AS ENUM('EN', 'ES')`);
        await queryRunner.query(`CREATE TABLE "faq" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "language" "public"."faq_language_enum" NOT NULL, "title" character varying NOT NULL, "text" character varying NOT NULL, CONSTRAINT "PK_d6f5a52b1a96dd8d0591f9fbc47" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "policy"`);
        await queryRunner.query(`DROP TYPE "public"."policy_language_enum"`);
        await queryRunner.query(`DROP TYPE "public"."policy_type_enum"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "blacklist_user"`);
        await queryRunner.query(`DROP TABLE "blacklist_ip"`);
        await queryRunner.query(`DROP TABLE "api_key"`);
        await queryRunner.query(`DROP TABLE "admin_user"`);
        await queryRunner.query(`DROP TYPE "public"."admin_user_audiences_enum"`);
        await queryRunner.query(`DROP TYPE "public"."user_audiences_enum"`);
        await queryRunner.query(`DROP TYPE "public"."api_key_audiences_enum"`);
    }

}
