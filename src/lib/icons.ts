/**
 * Curated icon set editors can pick from (select field), mapped to lucide components.
 * Keeping it curated keeps the visual language consistent: editors choose an icon by name,
 * never upload arbitrary SVG.
 */
import {
  Anchor, Award, BadgeCheck, Boxes, Briefcase, Building2, Calculator, CalendarCheck,
  ChartColumnIncreasing, ClipboardList, Compass, Crown, Eye, Factory, FileText, Flag, Gauge, Gavel,
  Globe, GraduationCap, Handshake, HardHat, HeartHandshake, Laptop, Layers, Lightbulb, MapPin,
  Megaphone, Network, Package, Palette, Puzzle, Rocket, Scale, ScrollText, Search, Settings,
  ShieldCheck, ShoppingCart, Sparkles, Target, TrendingUp, UserCheck, UserSearch, Users, UsersRound,
  Wallet, Workflow, type LucideIcon,
} from 'lucide-react'

export const ICONS = {
  anchor: Anchor, award: Award, badge: BadgeCheck, boxes: Boxes, briefcase: Briefcase,
  building: Building2, calculator: Calculator, calendar: CalendarCheck, chart: ChartColumnIncreasing,
  clipboard: ClipboardList, compass: Compass, crown: Crown, eye: Eye, factory: Factory,
  document: FileText, flag: Flag, gauge: Gauge, gavel: Gavel, globe: Globe, graduation: GraduationCap,
  handshake: Handshake, hardhat: HardHat, heart: HeartHandshake, laptop: Laptop, layers: Layers,
  lightbulb: Lightbulb, pin: MapPin, megaphone: Megaphone, network: Network, package: Package,
  palette: Palette, puzzle: Puzzle, rocket: Rocket, scale: Scale, scroll: ScrollText, search: Search,
  settings: Settings, shield: ShieldCheck, cart: ShoppingCart, sparkles: Sparkles, target: Target,
  trending: TrendingUp, usercheck: UserCheck, usersearch: UserSearch, users: Users, team: UsersRound,
  wallet: Wallet, workflow: Workflow,
} satisfies Record<string, LucideIcon>

export type IconName = keyof typeof ICONS

export const ICON_OPTIONS = (Object.keys(ICONS) as IconName[]).map((value) => ({
  label: value,
  value,
}))

export function iconFor(name: string | null | undefined): LucideIcon | null {
  return name && name in ICONS ? ICONS[name as IconName] : null
}
