import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_industries_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`title\` text,
  	\`text\` text,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_industries\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_industries_cards_order_idx\` ON \`pages_blocks_industries_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_industries_cards_parent_id_idx\` ON \`pages_blocks_industries_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_industries_cards_image_idx\` ON \`pages_blocks_industries_cards\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_industries_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`title\` text,
  	\`text\` text,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_industries\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_industries_cards_order_idx\` ON \`_pages_v_blocks_industries_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_industries_cards_parent_id_idx\` ON \`_pages_v_blocks_industries_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_industries_cards_image_idx\` ON \`_pages_v_blocks_industries_cards\` (\`image_id\`);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_pillars_items\` ADD \`image_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_pillars_items_image_idx\` ON \`pages_blocks_pillars_items\` (\`image_id\`);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_features_items\` ADD \`image_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_features_items_image_idx\` ON \`pages_blocks_features_items\` (\`image_id\`);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_process_steps\` ADD \`image_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_process_steps_image_idx\` ON \`pages_blocks_process_steps\` (\`image_id\`);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_list_items\` ADD \`image_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_list_items_image_idx\` ON \`pages_blocks_list_items\` (\`image_id\`);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_audience_split_cards\` ADD \`image_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_audience_split_cards_image_idx\` ON \`pages_blocks_audience_split_cards\` (\`image_id\`);`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_pillars_items\` ADD \`image_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_pillars_items_image_idx\` ON \`_pages_v_blocks_pillars_items\` (\`image_id\`);`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_features_items\` ADD \`image_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_features_items_image_idx\` ON \`_pages_v_blocks_features_items\` (\`image_id\`);`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_process_steps\` ADD \`image_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_process_steps_image_idx\` ON \`_pages_v_blocks_process_steps\` (\`image_id\`);`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_list_items\` ADD \`image_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_list_items_image_idx\` ON \`_pages_v_blocks_list_items\` (\`image_id\`);`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_audience_split_cards\` ADD \`image_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_audience_split_cards_image_idx\` ON \`_pages_v_blocks_audience_split_cards\` (\`image_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_blocks_industries_cards\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_industries_cards\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_pages_blocks_pillars_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`title\` text,
  	\`tagline\` text,
  	\`description\` text,
  	\`bullets_intro\` text,
  	\`closing\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_pillars\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_pages_blocks_pillars_items\`("_order", "_parent_id", "id", "icon", "title", "tagline", "description", "bullets_intro", "closing") SELECT "_order", "_parent_id", "id", "icon", "title", "tagline", "description", "bullets_intro", "closing" FROM \`pages_blocks_pillars_items\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_pillars_items\`;`)
  await db.run(sql`ALTER TABLE \`__new_pages_blocks_pillars_items\` RENAME TO \`pages_blocks_pillars_items\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`pages_blocks_pillars_items_order_idx\` ON \`pages_blocks_pillars_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_pillars_items_parent_id_idx\` ON \`pages_blocks_pillars_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_pages_blocks_features_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`title\` text,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_features\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_pages_blocks_features_items\`("_order", "_parent_id", "id", "icon", "title", "description") SELECT "_order", "_parent_id", "id", "icon", "title", "description" FROM \`pages_blocks_features_items\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_features_items\`;`)
  await db.run(sql`ALTER TABLE \`__new_pages_blocks_features_items\` RENAME TO \`pages_blocks_features_items\`;`)
  await db.run(sql`CREATE INDEX \`pages_blocks_features_items_order_idx\` ON \`pages_blocks_features_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_features_items_parent_id_idx\` ON \`pages_blocks_features_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_pages_blocks_process_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`title\` text,
  	\`subtitle\` text,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_process\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_pages_blocks_process_steps\`("_order", "_parent_id", "id", "icon", "title", "subtitle", "description") SELECT "_order", "_parent_id", "id", "icon", "title", "subtitle", "description" FROM \`pages_blocks_process_steps\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_process_steps\`;`)
  await db.run(sql`ALTER TABLE \`__new_pages_blocks_process_steps\` RENAME TO \`pages_blocks_process_steps\`;`)
  await db.run(sql`CREATE INDEX \`pages_blocks_process_steps_order_idx\` ON \`pages_blocks_process_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_process_steps_parent_id_idx\` ON \`pages_blocks_process_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_pages_blocks_list_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_list\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_pages_blocks_list_items\`("_order", "_parent_id", "id", "icon", "text") SELECT "_order", "_parent_id", "id", "icon", "text" FROM \`pages_blocks_list_items\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_list_items\`;`)
  await db.run(sql`ALTER TABLE \`__new_pages_blocks_list_items\` RENAME TO \`pages_blocks_list_items\`;`)
  await db.run(sql`CREATE INDEX \`pages_blocks_list_items_order_idx\` ON \`pages_blocks_list_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_list_items_parent_id_idx\` ON \`pages_blocks_list_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_pages_blocks_audience_split_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`eyebrow\` text,
  	\`title\` text,
  	\`text\` text,
  	\`phone\` text DEFAULT 'none',
  	\`cta_label\` text,
  	\`cta_href\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_audience_split\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_pages_blocks_audience_split_cards\`("_order", "_parent_id", "id", "icon", "eyebrow", "title", "text", "phone", "cta_label", "cta_href") SELECT "_order", "_parent_id", "id", "icon", "eyebrow", "title", "text", "phone", "cta_label", "cta_href" FROM \`pages_blocks_audience_split_cards\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_audience_split_cards\`;`)
  await db.run(sql`ALTER TABLE \`__new_pages_blocks_audience_split_cards\` RENAME TO \`pages_blocks_audience_split_cards\`;`)
  await db.run(sql`CREATE INDEX \`pages_blocks_audience_split_cards_order_idx\` ON \`pages_blocks_audience_split_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_audience_split_cards_parent_id_idx\` ON \`pages_blocks_audience_split_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__pages_v_blocks_pillars_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`title\` text,
  	\`tagline\` text,
  	\`description\` text,
  	\`bullets_intro\` text,
  	\`closing\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_pillars\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__pages_v_blocks_pillars_items\`("_order", "_parent_id", "id", "icon", "title", "tagline", "description", "bullets_intro", "closing", "_uuid") SELECT "_order", "_parent_id", "id", "icon", "title", "tagline", "description", "bullets_intro", "closing", "_uuid" FROM \`_pages_v_blocks_pillars_items\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_pillars_items\`;`)
  await db.run(sql`ALTER TABLE \`__new__pages_v_blocks_pillars_items\` RENAME TO \`_pages_v_blocks_pillars_items\`;`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_pillars_items_order_idx\` ON \`_pages_v_blocks_pillars_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_pillars_items_parent_id_idx\` ON \`_pages_v_blocks_pillars_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__pages_v_blocks_features_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`title\` text,
  	\`description\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_features\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__pages_v_blocks_features_items\`("_order", "_parent_id", "id", "icon", "title", "description", "_uuid") SELECT "_order", "_parent_id", "id", "icon", "title", "description", "_uuid" FROM \`_pages_v_blocks_features_items\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_features_items\`;`)
  await db.run(sql`ALTER TABLE \`__new__pages_v_blocks_features_items\` RENAME TO \`_pages_v_blocks_features_items\`;`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_features_items_order_idx\` ON \`_pages_v_blocks_features_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_features_items_parent_id_idx\` ON \`_pages_v_blocks_features_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__pages_v_blocks_process_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`title\` text,
  	\`subtitle\` text,
  	\`description\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_process\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__pages_v_blocks_process_steps\`("_order", "_parent_id", "id", "icon", "title", "subtitle", "description", "_uuid") SELECT "_order", "_parent_id", "id", "icon", "title", "subtitle", "description", "_uuid" FROM \`_pages_v_blocks_process_steps\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_process_steps\`;`)
  await db.run(sql`ALTER TABLE \`__new__pages_v_blocks_process_steps\` RENAME TO \`_pages_v_blocks_process_steps\`;`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_process_steps_order_idx\` ON \`_pages_v_blocks_process_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_process_steps_parent_id_idx\` ON \`_pages_v_blocks_process_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__pages_v_blocks_list_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_list\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__pages_v_blocks_list_items\`("_order", "_parent_id", "id", "icon", "text", "_uuid") SELECT "_order", "_parent_id", "id", "icon", "text", "_uuid" FROM \`_pages_v_blocks_list_items\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_list_items\`;`)
  await db.run(sql`ALTER TABLE \`__new__pages_v_blocks_list_items\` RENAME TO \`_pages_v_blocks_list_items\`;`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_list_items_order_idx\` ON \`_pages_v_blocks_list_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_list_items_parent_id_idx\` ON \`_pages_v_blocks_list_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__pages_v_blocks_audience_split_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`eyebrow\` text,
  	\`title\` text,
  	\`text\` text,
  	\`phone\` text DEFAULT 'none',
  	\`cta_label\` text,
  	\`cta_href\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_audience_split\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__pages_v_blocks_audience_split_cards\`("_order", "_parent_id", "id", "icon", "eyebrow", "title", "text", "phone", "cta_label", "cta_href", "_uuid") SELECT "_order", "_parent_id", "id", "icon", "eyebrow", "title", "text", "phone", "cta_label", "cta_href", "_uuid" FROM \`_pages_v_blocks_audience_split_cards\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_audience_split_cards\`;`)
  await db.run(sql`ALTER TABLE \`__new__pages_v_blocks_audience_split_cards\` RENAME TO \`_pages_v_blocks_audience_split_cards\`;`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_audience_split_cards_order_idx\` ON \`_pages_v_blocks_audience_split_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_audience_split_cards_parent_id_idx\` ON \`_pages_v_blocks_audience_split_cards\` (\`_parent_id\`);`)
}
