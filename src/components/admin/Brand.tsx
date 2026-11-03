/* Admin panel branding (login screen logo + nav icon). */
export function AdminLogo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/logo.png" alt="" width={64} height={64} style={{ borderRadius: '50%' }} />
      <div style={{ lineHeight: 1.1 }}>
        <div style={{ fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: 22, letterSpacing: 1, color: '#3c0c48' }}>PUPS HARBOUR</div>
        <div style={{ fontSize: 11, letterSpacing: 4, color: '#d98f0b', fontWeight: 600 }}>CONSULTANCY · ADMIN</div>
      </div>
    </div>
  )
}

export function AdminIcon() {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/brand/favicon-32.png" alt="Pups Harbour" width={28} height={28} style={{ borderRadius: '50%' }} />
}
