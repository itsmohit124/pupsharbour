import Image from 'next/image'
import Link from 'next/link'

export function Logo({ name, strapline, light = true }: { name: string; strapline?: string | null; light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label={`${name}, home`}>
      <Image src="/brand/logo.png" alt="" width={48} height={48} priority className="size-11 rounded-full bg-white sm:size-12" />
      <span className="leading-tight">
        <span className={`block font-display text-lg font-bold tracking-wide whitespace-nowrap uppercase sm:text-xl ${light ? 'text-white' : 'text-plum-900'}`}>
          Pups Harbour
        </span>
        <span className="block text-[10px] font-semibold tracking-[0.32em] text-gold-400 uppercase sm:text-[11px]">Consultancy</span>
      </span>
      {strapline && (
        <span className={`ml-3 hidden max-w-[11rem] border-l pl-4 text-sm leading-snug 2xl:block ${light ? 'border-white/25 text-white/80' : 'border-plum-200 text-muted'}`}>
          {strapline}
        </span>
      )}
    </Link>
  )
}
