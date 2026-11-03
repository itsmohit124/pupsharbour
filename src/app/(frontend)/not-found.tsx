import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <section className="bg-plum-950 py-28 text-center text-white">
      <div className="container-x">
        <p className="text-sm font-semibold tracking-[0.2em] text-gold-400 uppercase">404</p>
        <h1 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">This page has drifted off course.</h1>
        <p className="mt-4 text-white/75">Let our lighthouse guide you back.</p>
        <div className="mt-8 flex justify-center gap-4">
          <Button href="/" arrow>
            Back to home
          </Button>
          <Button href="/contact" variant="outlineLight">
            Contact us
          </Button>
        </div>
      </div>
    </section>
  )
}
