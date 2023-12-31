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
        DaugHaus Vinyl
    </nav>
  )
}
