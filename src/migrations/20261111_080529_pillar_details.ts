import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages_blocks_pillars_items\` ADD \`tagline\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_pillars_items\` ADD \`bullets_intro\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_pillars_items\` ADD \`closing\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_pillars\` ADD \`tagline\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_pillars_items\` ADD \`tagline\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_pillars_items\` ADD \`bullets_intro\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_pillars_items\` ADD \`closing\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_pillars\` ADD \`tagline\` text;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages_blocks_pillars_items\` DROP COLUMN \`tagline\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_pillars_items\` DROP COLUMN \`bullets_intro\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_pillars_items\` DROP COLUMN \`closing\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_pillars\` DROP COLUMN \`tagline\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_pillars_items\` DROP COLUMN \`tagline\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_pillars_items\` DROP COLUMN \`bullets_intro\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_pillars_items\` DROP COLUMN \`closing\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_pillars\` DROP COLUMN \`tagline\`;`)
}
