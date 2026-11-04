import Image from 'next/image'
import Link from 'next/link'

/**
 * Logo lockup: emblem + "PUPS HARBOUR" / "CONSULTANCY" / strapline (small, bold), stacked like a
 * corporate wordmark. The strapline comes from Site settings so it stays editable.
 */
export function Logo({ name, strapline, light = true }: { name: string; strapline?: string | null; light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label={`${name}, home`}>
      <Image src="/brand/logo.png" alt="" width={52} height={52} priority className="size-11 shrink-0 rounded-full bg-white sm:size-[3.25rem]" />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[1.05rem] font-bold tracking-wide whitespace-nowrap uppercase sm:text-xl ${light ? 'text-white' : 'text-plum-900'}`}>
          Pups Harbour
        </span>
        <span className="mt-1 text-[9px] font-semibold tracking-[0.34em] whitespace-nowrap text-gold-400 uppercase sm:text-[10px]">Consultancy</span>
        {strapline && (
          <span className={`mt-1.5 text-[9.5px] font-bold tracking-[0.04em] whitespace-nowrap sm:text-[10.5px] ${light ? 'text-white/80' : 'text-plum-800'}`}>
            {strapline}
          </span>
        )}
      </span>
    </Link>
  )
}
