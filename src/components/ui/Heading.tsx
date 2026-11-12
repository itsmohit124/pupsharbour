import clsx from 'clsx'

export function SectionHeading({
  eyebrow,
  heading,
  highlight,
  intro,
  tagline,
  dark = false,
  align = 'left',
  as: Tag = 'h2',
  size = 'lg',
  className,
}: {
  eyebrow?: string | null
  heading?: string | null
  highlight?: string | null
  intro?: string | null
  /** Short bold line between the gold rule and the intro. */
  tagline?: string | null
  dark?: boolean
  align?: 'left' | 'center'
  as?: 'h1' | 'h2'
  size?: 'lg' | 'xl'
  className?: string
}) {
  if (!heading && !eyebrow) return null
  return (
    <div className={clsx('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && (
        <p className={clsx('mb-3 text-xs font-semibold tracking-[0.18em] uppercase', dark ? 'text-gold-400' : 'text-plum-700')}>
          {eyebrow}
        </p>
      )}
      {heading && (
        <Tag
          className={clsx(
            'font-display font-semibold tracking-tight',
            size === 'xl' ? 'text-4xl leading-[1.08] sm:text-5xl lg:text-6xl' : 'text-3xl leading-tight sm:text-4xl',
            dark ? 'text-white' : 'text-plum-900',
          )}
        >
          {heading}
          {highlight && (
            <>
              {' '}
              <em className={clsx('italic', dark ? 'text-gold-400' : 'text-gold-600')}>{highlight}</em>
            </>
          )}
        </Tag>
      )}
      <span aria-hidden className={clsx('mt-4 block h-1 w-14 rounded-full bg-gold-500', align === 'center' && 'mx-auto')} />
      {tagline && (
        <p className={clsx('mt-5 font-display text-lg font-semibold sm:text-xl', dark ? 'text-white' : 'text-plum-800')}>{tagline}</p>
      )}
      {intro && <p className={clsx('mt-5 text-base leading-relaxed sm:text-lg', dark ? 'text-white/80' : 'text-muted')}>{intro}</p>}
    </div>
  )
}
