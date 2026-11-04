import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_hero_waypoints\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`label\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_waypoints_order_idx\` ON \`pages_blocks_hero_waypoints\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_waypoints_parent_id_idx\` ON \`pages_blocks_hero_waypoints\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_hero_highlights\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`title\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_highlights_order_idx\` ON \`pages_blocks_hero_highlights\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_highlights_parent_id_idx\` ON \`pages_blocks_hero_highlights\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`highlight\` text,
  	\`intro\` text,
  	\`body\` text,
  	\`primary_cta_label\` text,
  	\`primary_cta_href\` text,
  	\`secondary_cta_label\` text,
  	\`secondary_cta_href\` text,
  	\`image_id\` integer,
  	\`settings_hidden\` integer DEFAULT false,
  	\`settings_anchor_id\` text,
  	\`settings_theme\` text DEFAULT 'light',
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_order_idx\` ON \`pages_blocks_hero\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_parent_id_idx\` ON \`pages_blocks_hero\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_path_idx\` ON \`pages_blocks_hero\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_image_idx\` ON \`pages_blocks_hero\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_page_header\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`highlight\` text,
  	\`intro\` text,
  	\`breadcrumb\` text,
  	\`settings_hidden\` integer DEFAULT false,
  	\`settings_anchor_id\` text,
  	\`settings_theme\` text DEFAULT 'light',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_page_header_order_idx\` ON \`pages_blocks_page_header\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_page_header_parent_id_idx\` ON \`pages_blocks_page_header\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_page_header_path_idx\` ON \`pages_blocks_page_header\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_stats_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`value\` text,
  	\`label\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_stats_items_order_idx\` ON \`pages_blocks_stats_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_stats_items_parent_id_idx\` ON \`pages_blocks_stats_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`settings_hidden\` integer DEFAULT false,
  	\`settings_anchor_id\` text,
  	\`settings_theme\` text DEFAULT 'light',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_stats_order_idx\` ON \`pages_blocks_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_stats_parent_id_idx\` ON \`pages_blocks_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_stats_path_idx\` ON \`pages_blocks_stats\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_rich_content_paragraphs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_rich_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_rich_content_paragraphs_order_idx\` ON \`pages_blocks_rich_content_paragraphs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_rich_content_paragraphs_parent_id_idx\` ON \`pages_blocks_rich_content_paragraphs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_rich_content_bullets\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_rich_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_rich_content_bullets_order_idx\` ON \`pages_blocks_rich_content_bullets\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_rich_content_bullets_parent_id_idx\` ON \`pages_blocks_rich_content_bullets\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_rich_content\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`highlight\` text,
  	\`intro\` text,
  	\`closing\` text,
  	\`layout\` text DEFAULT 'centered',
  	\`settings_hidden\` integer DEFAULT false,
  	\`settings_anchor_id\` text,
  	\`settings_theme\` text DEFAULT 'light',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_rich_content_order_idx\` ON \`pages_blocks_rich_content\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_rich_content_parent_id_idx\` ON \`pages_blocks_rich_content\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_rich_content_path_idx\` ON \`pages_blocks_rich_content\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_pillars_items_bullets\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_pillars_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_pillars_items_bullets_order_idx\` ON \`pages_blocks_pillars_items_bullets\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_pillars_items_bullets_parent_id_idx\` ON \`pages_blocks_pillars_items_bullets\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_pillars_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`title\` text,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_pillars\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_pillars_items_order_idx\` ON \`pages_blocks_pillars_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_pillars_items_parent_id_idx\` ON \`pages_blocks_pillars_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_pillars\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`highlight\` text,
  	\`intro\` text,
  	\`settings_hidden\` integer DEFAULT false,
  	\`settings_anchor_id\` text,
  	\`settings_theme\` text DEFAULT 'light',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_pillars_order_idx\` ON \`pages_blocks_pillars\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_pillars_parent_id_idx\` ON \`pages_blocks_pillars\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_pillars_path_idx\` ON \`pages_blocks_pillars\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_features_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`title\` text,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_features\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_features_items_order_idx\` ON \`pages_blocks_features_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_features_items_parent_id_idx\` ON \`pages_blocks_features_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`highlight\` text,
  	\`intro\` text,
  	\`columns\` text DEFAULT '3',
  	\`variant\` text DEFAULT 'cards',
  	\`settings_hidden\` integer DEFAULT false,
  	\`settings_anchor_id\` text,
  	\`settings_theme\` text DEFAULT 'light',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_features_order_idx\` ON \`pages_blocks_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_features_parent_id_idx\` ON \`pages_blocks_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_features_path_idx\` ON \`pages_blocks_features\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_service_ecosystem\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`highlight\` text,
  	\`intro\` text,
  	\`center_label\` text DEFAULT 'End-to-End People Solutions',
  	\`show_services\` integer DEFAULT false,
  	\`cta_label\` text,
  	\`cta_href\` text,
  	\`settings_hidden\` integer DEFAULT false,
  	\`settings_anchor_id\` text,
  	\`settings_theme\` text DEFAULT 'light',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_service_ecosystem_order_idx\` ON \`pages_blocks_service_ecosystem\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_service_ecosystem_parent_id_idx\` ON \`pages_blocks_service_ecosystem\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_service_ecosystem_path_idx\` ON \`pages_blocks_service_ecosystem\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_services_detail\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`highlight\` text,
  	\`intro\` text,
  	\`settings_hidden\` integer DEFAULT false,
  	\`settings_anchor_id\` text,
  	\`settings_theme\` text DEFAULT 'light',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_services_detail_order_idx\` ON \`pages_blocks_services_detail\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_services_detail_parent_id_idx\` ON \`pages_blocks_services_detail\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_services_detail_path_idx\` ON \`pages_blocks_services_detail\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_process_steps_activities\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_process_steps\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_process_steps_activities_order_idx\` ON \`pages_blocks_process_steps_activities\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_process_steps_activities_parent_id_idx\` ON \`pages_blocks_process_steps_activities\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_process_steps\` (
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
  await db.run(sql`CREATE INDEX \`pages_blocks_process_steps_order_idx\` ON \`pages_blocks_process_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_process_steps_parent_id_idx\` ON \`pages_blocks_process_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_process\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`highlight\` text,
  	\`intro\` text,
  	\`show_activities\` integer DEFAULT false,
  	\`settings_hidden\` integer DEFAULT false,
  	\`settings_anchor_id\` text,
  	\`settings_theme\` text DEFAULT 'light',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_process_order_idx\` ON \`pages_blocks_process\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_process_parent_id_idx\` ON \`pages_blocks_process\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_process_path_idx\` ON \`pages_blocks_process\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_packages_tiers_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_packages_tiers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_packages_tiers_items_order_idx\` ON \`pages_blocks_packages_tiers_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_packages_tiers_items_parent_id_idx\` ON \`pages_blocks_packages_tiers_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_packages_tiers\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`subtitle\` text,
  	\`description\` text,
  	\`includes_previous\` text,
  	\`featured\` integer DEFAULT false,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_packages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_packages_tiers_order_idx\` ON \`pages_blocks_packages_tiers\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_packages_tiers_parent_id_idx\` ON \`pages_blocks_packages_tiers\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_packages\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`highlight\` text,
  	\`intro\` text,
  	\`note\` text,
  	\`cta_label\` text,
  	\`cta_href\` text,
  	\`settings_hidden\` integer DEFAULT false,
  	\`settings_anchor_id\` text,
  	\`settings_theme\` text DEFAULT 'light',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_packages_order_idx\` ON \`pages_blocks_packages\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_packages_parent_id_idx\` ON \`pages_blocks_packages\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_packages_path_idx\` ON \`pages_blocks_packages\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_list_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_list\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_list_items_order_idx\` ON \`pages_blocks_list_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_list_items_parent_id_idx\` ON \`pages_blocks_list_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`highlight\` text,
  	\`intro\` text,
  	\`variant\` text DEFAULT 'checks',
  	\`settings_hidden\` integer DEFAULT false,
  	\`settings_anchor_id\` text,
  	\`settings_theme\` text DEFAULT 'light',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_list_order_idx\` ON \`pages_blocks_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_list_parent_id_idx\` ON \`pages_blocks_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_list_path_idx\` ON \`pages_blocks_list\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_vision_mission_mission\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_vision_mission\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_vision_mission_mission_order_idx\` ON \`pages_blocks_vision_mission_mission\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_vision_mission_mission_parent_id_idx\` ON \`pages_blocks_vision_mission_mission\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_vision_mission\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`vision_heading\` text DEFAULT 'Our Vision',
  	\`vision\` text,
  	\`mission_heading\` text DEFAULT 'Our Mission',
  	\`settings_hidden\` integer DEFAULT false,
  	\`settings_anchor_id\` text,
  	\`settings_theme\` text DEFAULT 'light',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_vision_mission_order_idx\` ON \`pages_blocks_vision_mission\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_vision_mission_parent_id_idx\` ON \`pages_blocks_vision_mission\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_vision_mission_path_idx\` ON \`pages_blocks_vision_mission\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_industries\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`highlight\` text,
  	\`intro\` text,
  	\`variant\` text DEFAULT 'strip',
  	\`cta_label\` text,
  	\`cta_href\` text,
  	\`settings_hidden\` integer DEFAULT false,
  	\`settings_anchor_id\` text,
  	\`settings_theme\` text DEFAULT 'light',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_industries_order_idx\` ON \`pages_blocks_industries\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_industries_parent_id_idx\` ON \`pages_blocks_industries\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_industries_path_idx\` ON \`pages_blocks_industries\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_live_demo_modules\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`label\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_live_demo\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_live_demo_modules_order_idx\` ON \`pages_blocks_live_demo_modules\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_live_demo_modules_parent_id_idx\` ON \`pages_blocks_live_demo_modules\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_live_demo\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`highlight\` text,
  	\`intro\` text,
  	\`cta_label\` text,
  	\`cta_href\` text,
  	\`settings_hidden\` integer DEFAULT false,
  	\`settings_anchor_id\` text,
  	\`settings_theme\` text DEFAULT 'light',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_live_demo_order_idx\` ON \`pages_blocks_live_demo\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_live_demo_parent_id_idx\` ON \`pages_blocks_live_demo\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_live_demo_path_idx\` ON \`pages_blocks_live_demo\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_testimonials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`highlight\` text,
  	\`intro\` text,
  	\`note\` text,
  	\`settings_hidden\` integer DEFAULT false,
  	\`settings_anchor_id\` text,
  	\`settings_theme\` text DEFAULT 'light',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonials_order_idx\` ON \`pages_blocks_testimonials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonials_parent_id_idx\` ON \`pages_blocks_testimonials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonials_path_idx\` ON \`pages_blocks_testimonials\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_insights_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`highlight\` text,
  	\`intro\` text,
  	\`limit\` numeric DEFAULT 3,
  	\`settings_hidden\` integer DEFAULT false,
  	\`settings_anchor_id\` text,
  	\`settings_theme\` text DEFAULT 'light',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_insights_list_order_idx\` ON \`pages_blocks_insights_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_insights_list_parent_id_idx\` ON \`pages_blocks_insights_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_insights_list_path_idx\` ON \`pages_blocks_insights_list\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_cta\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`highlight\` text,
  	\`intro\` text,
  	\`primary_cta_label\` text,
  	\`primary_cta_href\` text,
  	\`secondary_cta_label\` text,
  	\`secondary_cta_href\` text,
  	\`show_whats_app\` integer DEFAULT true,
  	\`settings_hidden\` integer DEFAULT false,
  	\`settings_anchor_id\` text,
  	\`settings_theme\` text DEFAULT 'light',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_order_idx\` ON \`pages_blocks_cta\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_parent_id_idx\` ON \`pages_blocks_cta\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_path_idx\` ON \`pages_blocks_cta\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_enquiry_form\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`highlight\` text,
  	\`intro\` text,
  	\`submit_label\` text DEFAULT 'Send Business Enquiry',
  	\`success_message\` text DEFAULT 'Thank you. Our team will contact you within one business day.',
  	\`settings_hidden\` integer DEFAULT false,
  	\`settings_anchor_id\` text,
  	\`settings_theme\` text DEFAULT 'light',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_enquiry_form_order_idx\` ON \`pages_blocks_enquiry_form\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_enquiry_form_parent_id_idx\` ON \`pages_blocks_enquiry_form\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_enquiry_form_path_idx\` ON \`pages_blocks_enquiry_form\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_hiring_form\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`highlight\` text,
  	\`intro\` text,
  	\`submit_label\` text DEFAULT 'Submit Hiring Requirement',
  	\`success_message\` text DEFAULT 'Thank you. Our recruitment team will contact you to understand your hiring needs.',
  	\`settings_hidden\` integer DEFAULT false,
  	\`settings_anchor_id\` text,
  	\`settings_theme\` text DEFAULT 'light',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_hiring_form_order_idx\` ON \`pages_blocks_hiring_form\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hiring_form_parent_id_idx\` ON \`pages_blocks_hiring_form\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hiring_form_path_idx\` ON \`pages_blocks_hiring_form\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_application_form\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`highlight\` text,
  	\`intro\` text,
  	\`submit_label\` text DEFAULT 'Submit Your Resume',
  	\`note\` text,
  	\`success_message\` text DEFAULT 'Thank you. Our recruitment team will review your profile and contact you if there is a suitable opportunity.',
  	\`settings_hidden\` integer DEFAULT false,
  	\`settings_anchor_id\` text,
  	\`settings_theme\` text DEFAULT 'light',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_application_form_order_idx\` ON \`pages_blocks_application_form\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_application_form_parent_id_idx\` ON \`pages_blocks_application_form\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_application_form_path_idx\` ON \`pages_blocks_application_form\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_contact_info\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`highlight\` text,
  	\`intro\` text,
  	\`closing\` text,
  	\`settings_hidden\` integer DEFAULT false,
  	\`settings_anchor_id\` text,
  	\`settings_theme\` text DEFAULT 'light',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_info_order_idx\` ON \`pages_blocks_contact_info\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_info_parent_id_idx\` ON \`pages_blocks_contact_info\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_info_path_idx\` ON \`pages_blocks_contact_info\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_audience_split_cards_bullets\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_audience_split_cards\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_audience_split_cards_bullets_order_idx\` ON \`pages_blocks_audience_split_cards_bullets\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_audience_split_cards_bullets_parent_id_idx\` ON \`pages_blocks_audience_split_cards_bullets\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_audience_split_cards\` (
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
  await db.run(sql`CREATE INDEX \`pages_blocks_audience_split_cards_order_idx\` ON \`pages_blocks_audience_split_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_audience_split_cards_parent_id_idx\` ON \`pages_blocks_audience_split_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_audience_split\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`highlight\` text,
  	\`intro\` text,
  	\`settings_hidden\` integer DEFAULT false,
  	\`settings_anchor_id\` text,
  	\`settings_theme\` text DEFAULT 'light',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_audience_split_order_idx\` ON \`pages_blocks_audience_split\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_audience_split_parent_id_idx\` ON \`pages_blocks_audience_split\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_audience_split_path_idx\` ON \`pages_blocks_audience_split\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`slug\` text,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`meta_image_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_slug_idx\` ON \`pages\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`pages_meta_meta_image_idx\` ON \`pages\` (\`meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_updated_at_idx\` ON \`pages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`pages_created_at_idx\` ON \`pages\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`pages__status_idx\` ON \`pages\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_hero_waypoints\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`label\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_waypoints_order_idx\` ON \`_pages_v_blocks_hero_waypoints\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_waypoints_parent_id_idx\` ON \`_pages_v_blocks_hero_waypoints\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_hero_highlights\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`title\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_highlights_order_idx\` ON \`_pages_v_blocks_hero_highlights\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_highlights_parent_id_idx\` ON \`_pages_v_blocks_hero_highlights\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`highlight\` text,
  	\`intro\` text,
  	\`body\` text,
  	\`primary_cta_label\` text,
  	\`primary_cta_href\` text,
  	\`secondary_cta_label\` text,
  	\`secondary_cta_href\` text,
  	\`image_id\` integer,
  	\`settings_hidden\` integer DEFAULT false,
  	\`settings_anchor_id\` text,
  	\`settings_theme\` text DEFAULT 'light',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_order_idx\` ON \`_pages_v_blocks_hero\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_parent_id_idx\` ON \`_pages_v_blocks_hero\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_path_idx\` ON \`_pages_v_blocks_hero\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_image_idx\` ON \`_pages_v_blocks_hero\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_page_header\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`highlight\` text,
  	\`intro\` text,
  	\`breadcrumb\` text,
  	\`settings_hidden\` integer DEFAULT false,
  	\`settings_anchor_id\` text,
  	\`settings_theme\` text DEFAULT 'light',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_page_header_order_idx\` ON \`_pages_v_blocks_page_header\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_page_header_parent_id_idx\` ON \`_pages_v_blocks_page_header\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_page_header_path_idx\` ON \`_pages_v_blocks_page_header\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_stats_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`value\` text,
  	\`label\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_stats_items_order_idx\` ON \`_pages_v_blocks_stats_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_stats_items_parent_id_idx\` ON \`_pages_v_blocks_stats_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`settings_hidden\` integer DEFAULT false,
  	\`settings_anchor_id\` text,
  	\`settings_theme\` text DEFAULT 'light',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_stats_order_idx\` ON \`_pages_v_blocks_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_stats_parent_id_idx\` ON \`_pages_v_blocks_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_stats_path_idx\` ON \`_pages_v_blocks_stats\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_rich_content_paragraphs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_rich_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_rich_content_paragraphs_order_idx\` ON \`_pages_v_blocks_rich_content_paragraphs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_rich_content_paragraphs_parent_id_idx\` ON \`_pages_v_blocks_rich_content_paragraphs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_rich_content_bullets\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_rich_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_rich_content_bullets_order_idx\` ON \`_pages_v_blocks_rich_content_bullets\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_rich_content_bullets_parent_id_idx\` ON \`_pages_v_blocks_rich_content_bullets\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_rich_content\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`highlight\` text,
  	\`intro\` text,
  	\`closing\` text,
  	\`layout\` text DEFAULT 'centered',
  	\`settings_hidden\` integer DEFAULT false,
  	\`settings_anchor_id\` text,
  	\`settings_theme\` text DEFAULT 'light',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_rich_content_order_idx\` ON \`_pages_v_blocks_rich_content\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_rich_content_parent_id_idx\` ON \`_pages_v_blocks_rich_content\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_rich_content_path_idx\` ON \`_pages_v_blocks_rich_content\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_pillars_items_bullets\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_pillars_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_pillars_items_bullets_order_idx\` ON \`_pages_v_blocks_pillars_items_bullets\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_pillars_items_bullets_parent_id_idx\` ON \`_pages_v_blocks_pillars_items_bullets\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_pillars_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`title\` text,
  	\`description\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_pillars\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_pillars_items_order_idx\` ON \`_pages_v_blocks_pillars_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_pillars_items_parent_id_idx\` ON \`_pages_v_blocks_pillars_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_pillars\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`highlight\` text,
  	\`intro\` text,
  	\`settings_hidden\` integer DEFAULT false,
  	\`settings_anchor_id\` text,
  	\`settings_theme\` text DEFAULT 'light',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_pillars_order_idx\` ON \`_pages_v_blocks_pillars\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_pillars_parent_id_idx\` ON \`_pages_v_blocks_pillars\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_pillars_path_idx\` ON \`_pages_v_blocks_pillars\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_features_items\` (
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
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_features_items_order_idx\` ON \`_pages_v_blocks_features_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_features_items_parent_id_idx\` ON \`_pages_v_blocks_features_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`highlight\` text,
  	\`intro\` text,
  	\`columns\` text DEFAULT '3',
  	\`variant\` text DEFAULT 'cards',
  	\`settings_hidden\` integer DEFAULT false,
  	\`settings_anchor_id\` text,
  	\`settings_theme\` text DEFAULT 'light',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_features_order_idx\` ON \`_pages_v_blocks_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_features_parent_id_idx\` ON \`_pages_v_blocks_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_features_path_idx\` ON \`_pages_v_blocks_features\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_service_ecosystem\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`highlight\` text,
  	\`intro\` text,
  	\`center_label\` text DEFAULT 'End-to-End People Solutions',
  	\`show_services\` integer DEFAULT false,
  	\`cta_label\` text,
  	\`cta_href\` text,
  	\`settings_hidden\` integer DEFAULT false,
  	\`settings_anchor_id\` text,
  	\`settings_theme\` text DEFAULT 'light',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_service_ecosystem_order_idx\` ON \`_pages_v_blocks_service_ecosystem\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_service_ecosystem_parent_id_idx\` ON \`_pages_v_blocks_service_ecosystem\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_service_ecosystem_path_idx\` ON \`_pages_v_blocks_service_ecosystem\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_services_detail\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`highlight\` text,
  	\`intro\` text,
  	\`settings_hidden\` integer DEFAULT false,
  	\`settings_anchor_id\` text,
  	\`settings_theme\` text DEFAULT 'light',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_services_detail_order_idx\` ON \`_pages_v_blocks_services_detail\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_services_detail_parent_id_idx\` ON \`_pages_v_blocks_services_detail\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_services_detail_path_idx\` ON \`_pages_v_blocks_services_detail\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_process_steps_activities\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_process_steps\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_process_steps_activities_order_idx\` ON \`_pages_v_blocks_process_steps_activities\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_process_steps_activities_parent_id_idx\` ON \`_pages_v_blocks_process_steps_activities\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_process_steps\` (
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
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_process_steps_order_idx\` ON \`_pages_v_blocks_process_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_process_steps_parent_id_idx\` ON \`_pages_v_blocks_process_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_process\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`highlight\` text,
  	\`intro\` text,
  	\`show_activities\` integer DEFAULT false,
  	\`settings_hidden\` integer DEFAULT false,
  	\`settings_anchor_id\` text,
  	\`settings_theme\` text DEFAULT 'light',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_process_order_idx\` ON \`_pages_v_blocks_process\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_process_parent_id_idx\` ON \`_pages_v_blocks_process\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_process_path_idx\` ON \`_pages_v_blocks_process\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_packages_tiers_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_packages_tiers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_packages_tiers_items_order_idx\` ON \`_pages_v_blocks_packages_tiers_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_packages_tiers_items_parent_id_idx\` ON \`_pages_v_blocks_packages_tiers_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_packages_tiers\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`subtitle\` text,
  	\`description\` text,
  	\`includes_previous\` text,
  	\`featured\` integer DEFAULT false,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_packages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_packages_tiers_order_idx\` ON \`_pages_v_blocks_packages_tiers\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_packages_tiers_parent_id_idx\` ON \`_pages_v_blocks_packages_tiers\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_packages\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`highlight\` text,
  	\`intro\` text,
  	\`note\` text,
  	\`cta_label\` text,
  	\`cta_href\` text,
  	\`settings_hidden\` integer DEFAULT false,
  	\`settings_anchor_id\` text,
  	\`settings_theme\` text DEFAULT 'light',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_packages_order_idx\` ON \`_pages_v_blocks_packages\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_packages_parent_id_idx\` ON \`_pages_v_blocks_packages\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_packages_path_idx\` ON \`_pages_v_blocks_packages\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_list_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_list\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_list_items_order_idx\` ON \`_pages_v_blocks_list_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_list_items_parent_id_idx\` ON \`_pages_v_blocks_list_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`highlight\` text,
  	\`intro\` text,
  	\`variant\` text DEFAULT 'checks',
  	\`settings_hidden\` integer DEFAULT false,
  	\`settings_anchor_id\` text,
  	\`settings_theme\` text DEFAULT 'light',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_list_order_idx\` ON \`_pages_v_blocks_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_list_parent_id_idx\` ON \`_pages_v_blocks_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_list_path_idx\` ON \`_pages_v_blocks_list\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_vision_mission_mission\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_vision_mission\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_vision_mission_mission_order_idx\` ON \`_pages_v_blocks_vision_mission_mission\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_vision_mission_mission_parent_id_idx\` ON \`_pages_v_blocks_vision_mission_mission\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_vision_mission\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`vision_heading\` text DEFAULT 'Our Vision',
  	\`vision\` text,
  	\`mission_heading\` text DEFAULT 'Our Mission',
  	\`settings_hidden\` integer DEFAULT false,
  	\`settings_anchor_id\` text,
  	\`settings_theme\` text DEFAULT 'light',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_vision_mission_order_idx\` ON \`_pages_v_blocks_vision_mission\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_vision_mission_parent_id_idx\` ON \`_pages_v_blocks_vision_mission\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_vision_mission_path_idx\` ON \`_pages_v_blocks_vision_mission\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_industries\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`highlight\` text,
  	\`intro\` text,
  	\`variant\` text DEFAULT 'strip',
  	\`cta_label\` text,
  	\`cta_href\` text,
  	\`settings_hidden\` integer DEFAULT false,
  	\`settings_anchor_id\` text,
  	\`settings_theme\` text DEFAULT 'light',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_industries_order_idx\` ON \`_pages_v_blocks_industries\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_industries_parent_id_idx\` ON \`_pages_v_blocks_industries\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_industries_path_idx\` ON \`_pages_v_blocks_industries\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_live_demo_modules\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`label\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_live_demo\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_live_demo_modules_order_idx\` ON \`_pages_v_blocks_live_demo_modules\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_live_demo_modules_parent_id_idx\` ON \`_pages_v_blocks_live_demo_modules\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_live_demo\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`highlight\` text,
  	\`intro\` text,
  	\`cta_label\` text,
  	\`cta_href\` text,
  	\`settings_hidden\` integer DEFAULT false,
  	\`settings_anchor_id\` text,
  	\`settings_theme\` text DEFAULT 'light',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_live_demo_order_idx\` ON \`_pages_v_blocks_live_demo\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_live_demo_parent_id_idx\` ON \`_pages_v_blocks_live_demo\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_live_demo_path_idx\` ON \`_pages_v_blocks_live_demo\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_testimonials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`highlight\` text,
  	\`intro\` text,
  	\`note\` text,
  	\`settings_hidden\` integer DEFAULT false,
  	\`settings_anchor_id\` text,
  	\`settings_theme\` text DEFAULT 'light',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_testimonials_order_idx\` ON \`_pages_v_blocks_testimonials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_testimonials_parent_id_idx\` ON \`_pages_v_blocks_testimonials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_testimonials_path_idx\` ON \`_pages_v_blocks_testimonials\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_insights_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`highlight\` text,
  	\`intro\` text,
  	\`limit\` numeric DEFAULT 3,
  	\`settings_hidden\` integer DEFAULT false,
  	\`settings_anchor_id\` text,
  	\`settings_theme\` text DEFAULT 'light',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_insights_list_order_idx\` ON \`_pages_v_blocks_insights_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_insights_list_parent_id_idx\` ON \`_pages_v_blocks_insights_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_insights_list_path_idx\` ON \`_pages_v_blocks_insights_list\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_cta\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`highlight\` text,
  	\`intro\` text,
  	\`primary_cta_label\` text,
  	\`primary_cta_href\` text,
  	\`secondary_cta_label\` text,
  	\`secondary_cta_href\` text,
  	\`show_whats_app\` integer DEFAULT true,
  	\`settings_hidden\` integer DEFAULT false,
  	\`settings_anchor_id\` text,
  	\`settings_theme\` text DEFAULT 'light',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_cta_order_idx\` ON \`_pages_v_blocks_cta\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_cta_parent_id_idx\` ON \`_pages_v_blocks_cta\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_cta_path_idx\` ON \`_pages_v_blocks_cta\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_enquiry_form\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`highlight\` text,
  	\`intro\` text,
  	\`submit_label\` text DEFAULT 'Send Business Enquiry',
  	\`success_message\` text DEFAULT 'Thank you. Our team will contact you within one business day.',
  	\`settings_hidden\` integer DEFAULT false,
  	\`settings_anchor_id\` text,
  	\`settings_theme\` text DEFAULT 'light',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_enquiry_form_order_idx\` ON \`_pages_v_blocks_enquiry_form\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_enquiry_form_parent_id_idx\` ON \`_pages_v_blocks_enquiry_form\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_enquiry_form_path_idx\` ON \`_pages_v_blocks_enquiry_form\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_hiring_form\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`highlight\` text,
  	\`intro\` text,
  	\`submit_label\` text DEFAULT 'Submit Hiring Requirement',
  	\`success_message\` text DEFAULT 'Thank you. Our recruitment team will contact you to understand your hiring needs.',
  	\`settings_hidden\` integer DEFAULT false,
  	\`settings_anchor_id\` text,
  	\`settings_theme\` text DEFAULT 'light',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hiring_form_order_idx\` ON \`_pages_v_blocks_hiring_form\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hiring_form_parent_id_idx\` ON \`_pages_v_blocks_hiring_form\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hiring_form_path_idx\` ON \`_pages_v_blocks_hiring_form\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_application_form\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`highlight\` text,
  	\`intro\` text,
  	\`submit_label\` text DEFAULT 'Submit Your Resume',
  	\`note\` text,
  	\`success_message\` text DEFAULT 'Thank you. Our recruitment team will review your profile and contact you if there is a suitable opportunity.',
  	\`settings_hidden\` integer DEFAULT false,
  	\`settings_anchor_id\` text,
  	\`settings_theme\` text DEFAULT 'light',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_application_form_order_idx\` ON \`_pages_v_blocks_application_form\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_application_form_parent_id_idx\` ON \`_pages_v_blocks_application_form\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_application_form_path_idx\` ON \`_pages_v_blocks_application_form\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_contact_info\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`highlight\` text,
  	\`intro\` text,
  	\`closing\` text,
  	\`settings_hidden\` integer DEFAULT false,
  	\`settings_anchor_id\` text,
  	\`settings_theme\` text DEFAULT 'light',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_contact_info_order_idx\` ON \`_pages_v_blocks_contact_info\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_contact_info_parent_id_idx\` ON \`_pages_v_blocks_contact_info\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_contact_info_path_idx\` ON \`_pages_v_blocks_contact_info\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_audience_split_cards_bullets\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_audience_split_cards\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_audience_split_cards_bullets_order_idx\` ON \`_pages_v_blocks_audience_split_cards_bullets\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_audience_split_cards_bullets_parent_id_idx\` ON \`_pages_v_blocks_audience_split_cards_bullets\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_audience_split_cards\` (
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
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_audience_split_cards_order_idx\` ON \`_pages_v_blocks_audience_split_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_audience_split_cards_parent_id_idx\` ON \`_pages_v_blocks_audience_split_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_audience_split\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`highlight\` text,
  	\`intro\` text,
  	\`settings_hidden\` integer DEFAULT false,
  	\`settings_anchor_id\` text,
  	\`settings_theme\` text DEFAULT 'light',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_audience_split_order_idx\` ON \`_pages_v_blocks_audience_split\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_audience_split_parent_id_idx\` ON \`_pages_v_blocks_audience_split\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_audience_split_path_idx\` ON \`_pages_v_blocks_audience_split\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_slug\` text,
  	\`version_meta_title\` text,
  	\`version_meta_description\` text,
  	\`version_meta_image_id\` integer,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_parent_idx\` ON \`_pages_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_slug_idx\` ON \`_pages_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_meta_version_meta_image_idx\` ON \`_pages_v\` (\`version_meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_updated_at_idx\` ON \`_pages_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_created_at_idx\` ON \`_pages_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version__status_idx\` ON \`_pages_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_created_at_idx\` ON \`_pages_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_updated_at_idx\` ON \`_pages_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_latest_idx\` ON \`_pages_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_autosave_idx\` ON \`_pages_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`services_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_items_order_idx\` ON \`services_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_items_parent_id_idx\` ON \`services_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`short_title\` text,
  	\`slug\` text,
  	\`group_id\` integer,
  	\`flagship\` integer DEFAULT false,
  	\`icon\` text,
  	\`order\` numeric DEFAULT 0,
  	\`summary\` text,
  	\`focus\` text,
  	\`disclaimer\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`group_id\`) REFERENCES \`service_groups\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`services_slug_idx\` ON \`services\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`services_group_idx\` ON \`services\` (\`group_id\`);`)
  await db.run(sql`CREATE INDEX \`services_updated_at_idx\` ON \`services\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`services_created_at_idx\` ON \`services\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`services__status_idx\` ON \`services\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_version_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_version_items_order_idx\` ON \`_services_v_version_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_items_parent_id_idx\` ON \`_services_v_version_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_services_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_short_title\` text,
  	\`version_slug\` text,
  	\`version_group_id\` integer,
  	\`version_flagship\` integer DEFAULT false,
  	\`version_icon\` text,
  	\`version_order\` numeric DEFAULT 0,
  	\`version_summary\` text,
  	\`version_focus\` text,
  	\`version_disclaimer\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_group_id\`) REFERENCES \`service_groups\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_parent_idx\` ON \`_services_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_version_slug_idx\` ON \`_services_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_version_group_idx\` ON \`_services_v\` (\`version_group_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_version_updated_at_idx\` ON \`_services_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_version_created_at_idx\` ON \`_services_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_version__status_idx\` ON \`_services_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_created_at_idx\` ON \`_services_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_updated_at_idx\` ON \`_services_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_latest_idx\` ON \`_services_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`service_groups\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`summary\` text NOT NULL,
  	\`icon\` text NOT NULL,
  	\`order\` numeric DEFAULT 0,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`service_groups_slug_idx\` ON \`service_groups\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`service_groups_updated_at_idx\` ON \`service_groups\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`service_groups_created_at_idx\` ON \`service_groups\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`industries\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`icon\` text NOT NULL,
  	\`order\` numeric DEFAULT 0,
  	\`summary\` text NOT NULL,
  	\`image_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`industries_slug_idx\` ON \`industries\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`industries_image_idx\` ON \`industries\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`industries_updated_at_idx\` ON \`industries\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`industries_created_at_idx\` ON \`industries\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`insights\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`slug\` text,
  	\`category\` text DEFAULT 'hr',
  	\`published_at\` text,
  	\`summary\` text,
  	\`cover_id\` integer,
  	\`body\` text,
  	\`source_url\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`cover_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`insights_slug_idx\` ON \`insights\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`insights_cover_idx\` ON \`insights\` (\`cover_id\`);`)
  await db.run(sql`CREATE INDEX \`insights_updated_at_idx\` ON \`insights\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`insights_created_at_idx\` ON \`insights\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`insights__status_idx\` ON \`insights\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_insights_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_slug\` text,
  	\`version_category\` text DEFAULT 'hr',
  	\`version_published_at\` text,
  	\`version_summary\` text,
  	\`version_cover_id\` integer,
  	\`version_body\` text,
  	\`version_source_url\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`insights\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_cover_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_insights_v_parent_idx\` ON \`_insights_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_insights_v_version_version_slug_idx\` ON \`_insights_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_insights_v_version_version_cover_idx\` ON \`_insights_v\` (\`version_cover_id\`);`)
  await db.run(sql`CREATE INDEX \`_insights_v_version_version_updated_at_idx\` ON \`_insights_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_insights_v_version_version_created_at_idx\` ON \`_insights_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_insights_v_version_version__status_idx\` ON \`_insights_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_insights_v_created_at_idx\` ON \`_insights_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_insights_v_updated_at_idx\` ON \`_insights_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_insights_v_latest_idx\` ON \`_insights_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`testimonials\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`quote\` text NOT NULL,
  	\`name\` text NOT NULL,
  	\`designation\` text,
  	\`company\` text,
  	\`outcome\` text,
  	\`photo_id\` integer,
  	\`order\` numeric DEFAULT 0,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`testimonials_photo_idx\` ON \`testimonials\` (\`photo_id\`);`)
  await db.run(sql`CREATE INDEX \`testimonials_updated_at_idx\` ON \`testimonials\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`testimonials_created_at_idx\` ON \`testimonials\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`alt\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric,
  	\`sizes_thumbnail_url\` text,
  	\`sizes_thumbnail_width\` numeric,
  	\`sizes_thumbnail_height\` numeric,
  	\`sizes_thumbnail_mime_type\` text,
  	\`sizes_thumbnail_filesize\` numeric,
  	\`sizes_thumbnail_filename\` text,
  	\`sizes_card_url\` text,
  	\`sizes_card_width\` numeric,
  	\`sizes_card_height\` numeric,
  	\`sizes_card_mime_type\` text,
  	\`sizes_card_filesize\` numeric,
  	\`sizes_card_filename\` text,
  	\`sizes_hero_url\` text,
  	\`sizes_hero_width\` numeric,
  	\`sizes_hero_height\` numeric,
  	\`sizes_hero_mime_type\` text,
  	\`sizes_hero_filesize\` numeric,
  	\`sizes_hero_filename\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_thumbnail_sizes_thumbnail_filename_idx\` ON \`media\` (\`sizes_thumbnail_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_card_sizes_card_filename_idx\` ON \`media\` (\`sizes_card_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_hero_sizes_hero_filename_idx\` ON \`media\` (\`sizes_hero_filename\`);`)
  await db.run(sql`CREATE TABLE \`enquiries\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`status\` text DEFAULT 'new',
  	\`type\` text DEFAULT 'business' NOT NULL,
  	\`company_name\` text NOT NULL,
  	\`contact_person\` text NOT NULL,
  	\`designation\` text,
  	\`email\` text NOT NULL,
  	\`phone\` text NOT NULL,
  	\`industry\` text,
  	\`organisation_size\` text,
  	\`message\` text,
  	\`position\` text,
  	\`vacancies\` numeric,
  	\`location\` text,
  	\`experience\` text,
  	\`timeline\` text,
  	\`job_description_id\` integer,
  	\`notes\` text,
  	\`consent\` integer,
  	\`source_page\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`job_description_id\`) REFERENCES \`job_descriptions\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`enquiries_status_idx\` ON \`enquiries\` (\`status\`);`)
  await db.run(sql`CREATE INDEX \`enquiries_type_idx\` ON \`enquiries\` (\`type\`);`)
  await db.run(sql`CREATE INDEX \`enquiries_job_description_idx\` ON \`enquiries\` (\`job_description_id\`);`)
  await db.run(sql`CREATE INDEX \`enquiries_updated_at_idx\` ON \`enquiries\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`enquiries_created_at_idx\` ON \`enquiries\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`enquiries_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`services_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`enquiries\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`services_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`enquiries_rels_order_idx\` ON \`enquiries_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`enquiries_rels_parent_idx\` ON \`enquiries_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`enquiries_rels_path_idx\` ON \`enquiries_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`enquiries_rels_services_id_idx\` ON \`enquiries_rels\` (\`services_id\`);`)
  await db.run(sql`CREATE TABLE \`job_descriptions\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric
  );
  `)
  await db.run(sql`CREATE INDEX \`job_descriptions_updated_at_idx\` ON \`job_descriptions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`job_descriptions_created_at_idx\` ON \`job_descriptions\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`job_descriptions_filename_idx\` ON \`job_descriptions\` (\`filename\`);`)
  await db.run(sql`CREATE TABLE \`applications\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`status\` text DEFAULT 'new',
  	\`full_name\` text NOT NULL,
  	\`phone\` text NOT NULL,
  	\`email\` text NOT NULL,
  	\`current_location\` text,
  	\`qualification\` text,
  	\`total_experience\` text,
  	\`current_designation\` text,
  	\`preferred_location\` text,
  	\`expected_ctc\` text,
  	\`current_ctc\` text,
  	\`notice_period\` text,
  	\`resume_id\` integer,
  	\`notes\` text,
  	\`consent\` integer,
  	\`source_page\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`resume_id\`) REFERENCES \`resumes\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`applications_status_idx\` ON \`applications\` (\`status\`);`)
  await db.run(sql`CREATE INDEX \`applications_resume_idx\` ON \`applications\` (\`resume_id\`);`)
  await db.run(sql`CREATE INDEX \`applications_updated_at_idx\` ON \`applications\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`applications_created_at_idx\` ON \`applications\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`resumes\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric
  );
  `)
  await db.run(sql`CREATE INDEX \`resumes_updated_at_idx\` ON \`resumes\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`resumes_created_at_idx\` ON \`resumes\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`resumes_filename_idx\` ON \`resumes\` (\`filename\`);`)
  await db.run(sql`CREATE TABLE \`users_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_sessions_order_idx\` ON \`users_sessions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`users_sessions_parent_id_idx\` ON \`users_sessions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`phone\` text,
  	\`role\` text NOT NULL,
  	\`active\` integer DEFAULT true,
  	\`must_change_password\` integer DEFAULT false,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`reset_password_requested_at\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`users_role_idx\` ON \`users\` (\`role\`);`)
  await db.run(sql`CREATE INDEX \`users_active_idx\` ON \`users\` (\`active\`);`)
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`CREATE TABLE \`audit_logs\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`action\` text NOT NULL,
  	\`actor_id\` integer,
  	\`actor_email\` text,
  	\`target_collection\` text,
  	\`target_id\` text,
  	\`summary\` text,
  	\`changed_fields\` text,
  	\`ip\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`actor_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`audit_logs_action_idx\` ON \`audit_logs\` (\`action\`);`)
  await db.run(sql`CREATE INDEX \`audit_logs_actor_idx\` ON \`audit_logs\` (\`actor_id\`);`)
  await db.run(sql`CREATE INDEX \`audit_logs_target_collection_idx\` ON \`audit_logs\` (\`target_collection\`);`)
  await db.run(sql`CREATE INDEX \`audit_logs_target_id_idx\` ON \`audit_logs\` (\`target_id\`);`)
  await db.run(sql`CREATE INDEX \`audit_logs_updated_at_idx\` ON \`audit_logs\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`audit_logs_created_at_idx\` ON \`audit_logs\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`services_id\` integer,
  	\`service_groups_id\` integer,
  	\`industries_id\` integer,
  	\`insights_id\` integer,
  	\`testimonials_id\` integer,
  	\`media_id\` integer,
  	\`enquiries_id\` integer,
  	\`job_descriptions_id\` integer,
  	\`applications_id\` integer,
  	\`resumes_id\` integer,
  	\`users_id\` integer,
  	\`audit_logs_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`services_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`service_groups_id\`) REFERENCES \`service_groups\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`industries_id\`) REFERENCES \`industries\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`insights_id\`) REFERENCES \`insights\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`testimonials_id\`) REFERENCES \`testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`enquiries_id\`) REFERENCES \`enquiries\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`job_descriptions_id\`) REFERENCES \`job_descriptions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`applications_id\`) REFERENCES \`applications\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`resumes_id\`) REFERENCES \`resumes\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_logs_id\`) REFERENCES \`audit_logs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_services_id_idx\` ON \`payload_locked_documents_rels\` (\`services_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_service_groups_id_idx\` ON \`payload_locked_documents_rels\` (\`service_groups_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_industries_id_idx\` ON \`payload_locked_documents_rels\` (\`industries_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_insights_id_idx\` ON \`payload_locked_documents_rels\` (\`insights_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_testimonials_id_idx\` ON \`payload_locked_documents_rels\` (\`testimonials_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_enquiries_id_idx\` ON \`payload_locked_documents_rels\` (\`enquiries_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_job_descriptions_id_idx\` ON \`payload_locked_documents_rels\` (\`job_descriptions_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_applications_id_idx\` ON \`payload_locked_documents_rels\` (\`applications_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_resumes_id_idx\` ON \`payload_locked_documents_rels\` (\`resumes_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_audit_logs_id_idx\` ON \`payload_locked_documents_rels\` (\`audit_logs_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`site_settings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`site_name\` text DEFAULT 'Pups Harbour Consultancy' NOT NULL,
  	\`tagline\` text DEFAULT 'Your Partner in Business Growth',
  	\`strapline\` text DEFAULT 'Guiding People. Building Futures.',
  	\`pillars_line\` text DEFAULT 'Brand · Marketing · HR · Strategy',
  	\`phone\` text NOT NULL,
  	\`whatsapp\` text NOT NULL,
  	\`business_phone\` text,
  	\`recruitment_phone\` text,
  	\`whatsapp_message\` text DEFAULT 'Hello Pups Harbour, I would like to know more about your services.',
  	\`email\` text NOT NULL,
  	\`hours\` text DEFAULT 'Monday – Friday, 9:00 AM – 6:00 PM',
  	\`location\` text DEFAULT 'Gujarat, India',
  	\`website\` text DEFAULT 'www.pupsharbour.com',
  	\`founded_year\` numeric DEFAULT 2021,
  	\`linkedin\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`header_nav\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`href\` text NOT NULL,
  	\`dropdown\` text DEFAULT 'none',
  	\`hide_when_empty\` text DEFAULT 'never',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`header_nav_order_idx\` ON \`header_nav\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`header_nav_parent_id_idx\` ON \`header_nav\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`header\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`secondary_cta_label\` text,
  	\`secondary_cta_href\` text,
  	\`primary_cta_label\` text,
  	\`primary_cta_href\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`footer_quick_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`href\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_quick_links_order_idx\` ON \`footer_quick_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`footer_quick_links_parent_id_idx\` ON \`footer_quick_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`footer_legal_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`href\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_legal_links_order_idx\` ON \`footer_legal_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`footer_legal_links_parent_id_idx\` ON \`footer_legal_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`footer\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`about\` text,
  	\`closing_line\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_blocks_hero_waypoints\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_hero_highlights\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_hero\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_page_header\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_stats_items\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_stats\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_rich_content_paragraphs\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_rich_content_bullets\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_rich_content\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_pillars_items_bullets\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_pillars_items\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_pillars\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_features_items\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_features\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_service_ecosystem\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_services_detail\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_process_steps_activities\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_process_steps\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_process\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_packages_tiers_items\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_packages_tiers\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_packages\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_list_items\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_list\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_vision_mission_mission\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_vision_mission\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_industries\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_live_demo_modules\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_live_demo\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_testimonials\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_insights_list\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_cta\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_enquiry_form\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_hiring_form\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_application_form\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_contact_info\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_audience_split_cards_bullets\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_audience_split_cards\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_audience_split\`;`)
  await db.run(sql`DROP TABLE \`pages\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_hero_waypoints\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_hero_highlights\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_hero\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_page_header\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_stats_items\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_stats\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_rich_content_paragraphs\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_rich_content_bullets\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_rich_content\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_pillars_items_bullets\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_pillars_items\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_pillars\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_features_items\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_features\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_service_ecosystem\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_services_detail\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_process_steps_activities\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_process_steps\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_process\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_packages_tiers_items\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_packages_tiers\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_packages\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_list_items\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_list\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_vision_mission_mission\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_vision_mission\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_industries\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_live_demo_modules\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_live_demo\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_testimonials\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_insights_list\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_cta\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_enquiry_form\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_hiring_form\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_application_form\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_contact_info\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_audience_split_cards_bullets\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_audience_split_cards\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_audience_split\`;`)
  await db.run(sql`DROP TABLE \`_pages_v\`;`)
  await db.run(sql`DROP TABLE \`services_items\`;`)
  await db.run(sql`DROP TABLE \`services\`;`)
  await db.run(sql`DROP TABLE \`_services_v_version_items\`;`)
  await db.run(sql`DROP TABLE \`_services_v\`;`)
  await db.run(sql`DROP TABLE \`service_groups\`;`)
  await db.run(sql`DROP TABLE \`industries\`;`)
  await db.run(sql`DROP TABLE \`insights\`;`)
  await db.run(sql`DROP TABLE \`_insights_v\`;`)
  await db.run(sql`DROP TABLE \`testimonials\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`DROP TABLE \`enquiries\`;`)
  await db.run(sql`DROP TABLE \`enquiries_rels\`;`)
  await db.run(sql`DROP TABLE \`job_descriptions\`;`)
  await db.run(sql`DROP TABLE \`applications\`;`)
  await db.run(sql`DROP TABLE \`resumes\`;`)
  await db.run(sql`DROP TABLE \`users_sessions\`;`)
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`DROP TABLE \`audit_logs\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_migrations\`;`)
  await db.run(sql`DROP TABLE \`site_settings\`;`)
  await db.run(sql`DROP TABLE \`header_nav\`;`)
  await db.run(sql`DROP TABLE \`header\`;`)
  await db.run(sql`DROP TABLE \`footer_quick_links\`;`)
  await db.run(sql`DROP TABLE \`footer_legal_links\`;`)
  await db.run(sql`DROP TABLE \`footer\`;`)
}
