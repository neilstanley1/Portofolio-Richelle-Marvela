'use client'

import Link from 'next/link'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const items = [
  ['WORK', '/#work'], ['SHOWCASE', '/showcase'], ['ABOUT', '/#about'], ['EXPERIENCE', '/#experience'], ['SKILLS', '/#skills'], ['CONTACT', '/#contact'],
]

export function GlobalNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const showcaseActive = pathname.startsWith('/showcase') || pathname.startsWith('/projects')

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'auto'
    return () => { document.body.style.overflow = 'auto' }
  }, [open])

  return <header className="site-header global-nav">
    <Link href="/#top" className="brand" onClick={() => setOpen(false)}>RICHELLE<br />MARVELA</Link>
    
    <div className={`nav-container ${open ? 'nav-open' : ''}`}>
      <nav aria-label="Main navigation">
        {items.map(([label, href]) => (
          <Link key={label} href={href} className={(label === 'SHOWCASE' && showcaseActive) ? 'nav-active' : ''} onClick={() => setOpen(false)}>
            {label}
          </Link>
        ))}
      </nav>
      <a className="nav-resume" href="mailto:richellemarvela27@gmail.com?subject=Resume%20request" onClick={() => setOpen(false)}>
        RESUME <ArrowUpRight />
      </a>
    </div>

    <button className="menu-button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
      {open ? <X /> : <Menu />}
    </button>
  </header>
}
