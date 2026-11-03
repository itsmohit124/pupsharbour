const BARS = [22, 34, 30, 48, 44, 62, 58, 80]

export function BarChart3Placeholder() {
  return (
    <div className="flex h-16 items-end gap-1.5 sm:h-20" aria-hidden>
      {BARS.map((h, i) => (
        <span
          key={i}
          className={i === BARS.length - 1 ? 'flex-1 rounded-t bg-gold-500' : 'flex-1 rounded-t bg-plum-600/70'}
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  )
}
