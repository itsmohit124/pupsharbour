import { BarChart3Placeholder } from './bars'

/**
 * Illustrative HR dashboard (laptop mock-up) for the Live Demo section. The figures are sample
 * data, labelled as such for screen readers; it is a visual, not live data.
 */
export function DashboardMock({ title = 'Workforce Dashboard' }: { title?: string }) {
  const nav = ['Dashboard', 'Recruitment', 'Employees', 'Attendance', 'Payroll', 'Compliance', 'Analytics']
  const kpis = [
    ['125', 'Open Positions'],
    ['320', 'Applicants'],
    ['48', 'Interviews'],
    ['36', 'Hires'],
  ]
  return (
    <figure className="mx-auto w-full max-w-xl" aria-label="Sample HR dashboard illustration with example figures">
      <div className="rounded-t-2xl border-[10px] border-b-0 border-ink bg-ink shadow-2xl">
        <div className="flex overflow-hidden rounded-md bg-white text-[10px] sm:text-xs">
          <aside className="hidden w-28 shrink-0 bg-plum-900 p-3 text-white/80 sm:block">
            <p className="mb-3 text-[11px] font-bold text-white">PUPS HARBOUR</p>
            <ul className="space-y-1.5">
              {nav.map((n, i) => (
                <li key={n} className={i === 0 ? 'rounded bg-white/15 px-2 py-1 text-white' : 'px-2 py-1'}>
                  {n}
                </li>
              ))}
            </ul>
          </aside>
          <div className="flex-1 p-3 sm:p-4">
            <p className="mb-3 font-semibold text-plum-900">{title}</p>
            <div className="grid grid-cols-4 gap-2">
              {kpis.map(([v, l]) => (
                <div key={l} className="rounded-md border border-plum-100 p-2 text-center">
                  <p className="text-sm font-bold text-ink sm:text-lg">{v}</p>
                  <p className="text-[9px] text-muted">{l}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              <div className="col-span-2 rounded-md border border-plum-100 p-2">
                <p className="mb-1 font-medium text-ink">Hiring Progress</p>
                <BarChart3Placeholder />
              </div>
              <div className="flex flex-col items-center justify-center rounded-md border border-plum-100 p-2">
                <div
                  className="flex size-16 items-center justify-center rounded-full sm:size-20"
                  style={{ background: 'conic-gradient(var(--color-plum-800) 0 92%, var(--color-plum-100) 92% 100%)' }}
                >
                  <span className="flex size-11 items-center justify-center rounded-full bg-white text-xs font-bold text-ink sm:size-14 sm:text-sm">
                    92%
                  </span>
                </div>
                <p className="mt-1 text-[9px] text-muted">Closure Rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto h-3 w-[108%] -translate-x-[3.7%] rounded-b-xl bg-gradient-to-b from-plum-200 to-plum-100" />
      <figcaption className="sr-only">Example figures for illustration only.</figcaption>
    </figure>
  )
}
