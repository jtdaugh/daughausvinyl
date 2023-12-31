'use client'

/* Core */
import Link from 'next/link'
import { usePathname } from 'next/navigation'

/* Instruments */
import styles from '../styles/layout.module.css'

export const Nav = () => {
  const pathname = usePathname()

  return (
    <nav className={styles.nav}>
        <div className="text-3xl font-bold my-2 text-[#eee]">DaugHaus Vinyl</div>
    </nav>
  )
}
