import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages_blocks_process\` ADD \`cta_label\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_process\` ADD \`cta_href\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_process\` ADD \`cta_label\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_process\` ADD \`cta_href\` text;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages_blocks_process\` DROP COLUMN \`cta_label\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_process\` DROP COLUMN \`cta_href\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_process\` DROP COLUMN \`cta_label\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_process\` DROP COLUMN \`cta_href\`;`)
}
