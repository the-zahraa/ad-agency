// CookieConsent.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import Script from 'next/script'
import { usePathname } from 'next/navigation'

/** Brand + storage */
const BRAND = '#9000ff'
const COOKIE_NAME = 'm44_cc_v1'
const MAX_AGE_DAYS = 365

/** Types */
type Consent = { essential: true; analytics: boolean; marketing: boolean; functional: boolean }
type Category = keyof Omit<Consent, 'essential'>
type Listener = (c: Consent) => void
type CookieManagerWindow = Window & { openCookieManager?: () => void }

/** Defaults */
const defaultConsent: Consent = { essential: true, analytics: false, marketing: false, functional: false }

/** Helpers */
const escapeRe = (s: string) => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
const toMaxAge = (days: number | string = MAX_AGE_DAYS) => {
  const n = typeof days === 'number' ? days : Number(days)
  const d = Number.isFinite(n) ? n : MAX_AGE_DAYS
  return Math.floor(d * 86400)
}
function getCookie(name: string) {
  if (typeof document === 'undefined') return null
  const m = document.cookie.match(new RegExp('(?:^|; )' + escapeRe(name) + '=([^;]*)'))
  return m ? decodeURIComponent(m[1]) : null
}
function setCookie(name: string, value: string, days: number | string = MAX_AGE_DAYS) {
  if (typeof document === 'undefined') return
  const maxAge = toMaxAge(days)
  const secure = location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${maxAge}; Path=/; SameSite=Lax${secure}`
}

/** Tiny pub/sub for consent changes (with unsubscribe returning void) */
const listeners = new Set<Listener>()
function notify(c: Consent) { listeners.forEach(fn => fn(c)) }
export function onConsentChange(fn: Listener): () => void {
  listeners.add(fn)
  return () => { listeners.delete(fn) } // return void, not boolean
}

export function getConsentClient(): Consent {
  try {
    const raw = getCookie(COOKIE_NAME)
    return raw ? (JSON.parse(raw) as Consent) : defaultConsent
  } catch {
    return defaultConsent
  }
}

/** Gate: render children only if category is allowed */
export function ConsentGate({ category, children }: { category: Category; children: React.ReactNode }) {
  // Avoid hydration mismatch by delaying cookie reads to client
  const [c, setC] = useState<Consent>(defaultConsent)
  const [ready, setReady] = useState(false)
  useEffect(() => {
    setC(getConsentClient())
    const off = onConsentChange(setC)
    setReady(true)
    return () => { off() } // cleanup returns void
  }, [])
  if (!ready) return null
  if (!c[category]) return null
  return <>{children}</>
}

/** Banner (modal) + Privacy-only slim bar */
export default function CookieConsent() {
  const pathname = usePathname()
  const suppressRoutes = ['/privacy'] // add '/cookies' here too if you make a separate cookies page
  const suppressOnThisRoute = !!pathname && suppressRoutes.some(r => pathname.startsWith(r))

  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)
  const [hasChoice, setHasChoice] = useState(false)
  const [showCustomize, setShowCustomize] = useState(false)
  const [prefs, setPrefs] = useState<Consent>(defaultConsent)
  const firstButtonRef = useRef<HTMLButtonElement | null>(null)

  // init (client-only)
  useEffect(() => {
    setMounted(true)
    const stored = getConsentClient()
    const madeChoice = JSON.stringify(stored) !== JSON.stringify(defaultConsent)
    setHasChoice(madeChoice)
    setPrefs(stored)

    // leading semicolon prevents ASI issues if previous line ends without ;
    ;(window as CookieManagerWindow).openCookieManager = () => {
      setShowCustomize(true)
      setOpen(true)
      setTimeout(() => firstButtonRef.current?.focus(), 0)
    }
    return () => {
      delete (window as CookieManagerWindow).openCookieManager
    }
  }, [])

  // route-aware behavior: if no choice yet, suppress blocking modal on /privacy; restore elsewhere
  useEffect(() => {
    if (!mounted) return
    if (hasChoice) { setOpen(false); return }
    setOpen(!suppressOnThisRoute)
  }, [mounted, hasChoice, suppressOnThisRoute])

  // Lock scroll behind blocking modal (skip on /privacy even if opened via manager)
  useEffect(() => {
    if (!mounted) return
    if (open && !suppressOnThisRoute) {
      const scrollY = window.scrollY
      document.documentElement.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.left = '0'
      document.body.style.right = '0'
      document.body.style.width = '100%'
    } else {
      const top = document.body.style.top
      document.documentElement.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.width = ''
      if (top) window.scrollTo(0, parseInt(top || '0') * -1)
    }
    return () => {
      document.documentElement.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.width = ''
    }
  }, [open, mounted, suppressOnThisRoute])

  const save = (next: Consent) => {
    setCookie(COOKIE_NAME, JSON.stringify(next))
    setHasChoice(true)
    notify(next)
    setOpen(false)
  }
  const acceptAll = () => save({ essential: true, analytics: true, marketing: true, functional: true })
  const rejectAll = () => save({ essential: true, analytics: false, marketing: false, functional: false })
  const toggle = (cat: Category) => setPrefs(p => ({ ...p, [cat]: !p[cat] }))

  if (!mounted) return null

  const cardStyle: React.CSSProperties = {
    background: '#111', color: '#fff', borderRadius: 16, border: '1px solid #222', boxShadow: '0 10px 30px rgba(0,0,0,.45)'
  }
  const btnPrimary: React.CSSProperties = {
    background: BRAND, color: '#fff', borderRadius: 12, padding: '10px 14px', fontWeight: 700, border: `1px solid ${BRAND}`
  }
  const btnGhost: React.CSSProperties = {
    background: 'transparent', color: 'inherit', borderRadius: 12, padding: '10px 14px', fontWeight: 600, border: '1px solid rgba(255,255,255,0.2)'
  }

  return (
    <>
      {/* Non-blocking slim bar on /privacy when user hasn’t chosen yet (buttons styled) */}
      {suppressOnThisRoute && !hasChoice && (
        <div
          className="fixed left-1/2 -translate-x-1/2 bottom-4 z-[9998] w-[min(960px,calc(100%-24px))]"
          style={{ filter: 'drop-shadow(0 6px 18px rgba(0,0,0,.12))' }}
        >
          <div
            className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4 rounded-2xl border px-4 py-3 bg-white"
            style={{ borderColor: 'rgba(0,0,0,0.08)' }}
          >
            <p className="text-sm text-neutral-800">
              We use cookies to keep M44 fast and relevant. Read our{' '}
              <a href="/privacy" className="underline" style={{ color: BRAND }}>Privacy & Cookies</a>.
            </p>
            <div className="flex flex-wrap gap-2">
              <button onClick={acceptAll} className="text-sm font-semibold" style={{ ...btnPrimary, color: '#fff' }}>
                Accept all
              </button>
              <button onClick={rejectAll} className="text-sm" style={{ ...btnGhost, color: '#111', border: '1px solid rgba(0,0,0,0.15)' }}>
                Essential only
              </button>
              <button
                onClick={() => { setShowCustomize(true); setOpen(true); setTimeout(() => firstButtonRef.current?.focus(), 0) }}
                className="text-sm"
                style={{ ...btnGhost, color: '#111', border: '1px solid rgba(0,0,0,0.15)' }}
              >
                Customize
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Blocking modal on all other routes until choice is made */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Cookie consent"
          className="fixed inset-0 z-[9999] flex items-end md:items-center justify-center p-3"
          style={{ backdropFilter: 'blur(3px)', background: 'rgba(0,0,0,.45)' }}
        >
          <div className="w-[min(720px,100%)]" style={cardStyle}>
            <div className="p-4 md:p-5">
              <h2 className="text-lg md:text-xl font-extrabold tracking-tight">We value your privacy</h2>
              <p className="mt-2 text-sm opacity-90">
                Cookies help improve speed, security, and relevance on m44. Learn more in{' '}
                <a href="/privacy" className="underline" style={{ color: BRAND }}>Privacy & Cookies</a>.
              </p>

              {!showCustomize && (
                <div className="mt-4 flex flex-wrap gap-2">
                  <button ref={firstButtonRef} onClick={acceptAll} style={btnPrimary}>Accept all</button>
                  <button onClick={rejectAll} style={btnGhost}>Essential only</button>
                  <button onClick={() => { setShowCustomize(true); setTimeout(() => firstButtonRef.current?.focus(), 0) }} style={btnGhost}>Customize</button>
                </div>
              )}

              {showCustomize && (
                <div className="mt-4 border-t border-white/10 pt-4">
                  <fieldset className="space-y-2 text-sm">
                    <label className="flex items-center gap-3"><input type="checkbox" checked disabled /> <span>Essential (always on)</span></label>
                    <label className="flex items-center gap-3"><input type="checkbox" checked={prefs.analytics} onChange={() => toggle('analytics')} /> <span>Analytics (GA4, etc.)</span></label>
                    <label className="flex items-center gap-3"><input type="checkbox" checked={prefs.marketing} onChange={() => toggle('marketing')} /> <span>Marketing pixels (Meta, TikTok)</span></label>
                    <label className="flex items-center gap-3"><input type="checkbox" checked={prefs.functional} onChange={() => toggle('functional')} /> <span>Functional embeds (calendars/forms)</span></label>
                  </fieldset>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {/* Order: Accept all, Essential only, Save preferences */}
                    <button onClick={acceptAll} style={btnGhost}>Accept all</button>
                    <button onClick={rejectAll} style={btnGhost}>Essential only</button>
                    <button onClick={() => save(prefs)} style={btnPrimary}>Save preferences</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

/** GA4 + Meta only after consent */
export function AnalyticsScripts() {
  return (
    <>
      {/* GA4 */}
      <ConsentGate category="analytics">
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-2GBKK2RGWC" strategy="afterInteractive" />
        <Script id="ga4" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){ dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', 'G-2GBKK2RGWC', { 'anonymize_ip': true });
          `}
        </Script>
      </ConsentGate>

      {/* Meta Pixel */}
      <ConsentGate category="marketing">
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !(function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n; n.loaded=!0; n.version='2.0'; n.queue=[]; t=b.createElement(e); t.async=!0;
            t.src=v; s=b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t,s)})(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init','1538557934185142');
            fbq('track','PageView');
          `}
        </Script>
      </ConsentGate>
    </>
  )
}
