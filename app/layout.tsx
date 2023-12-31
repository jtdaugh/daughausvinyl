/* Components */
import { Providers } from '@/lib/providers'
import { Nav } from './components/Nav'
import { Inter, Roboto_Mono, Rubik_Glitch, Diphylleia } from 'next/font/google'
 
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})


const rubik = Rubik_Glitch({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-rubik-glitch',
  weight: "400",
})

const diphylleia = Diphylleia({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-diphylleia',
  weight: "400",
})
 
 
const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
})

/* Instruments */
import styles from './styles/layout.module.css'
import './styles/globals.css'

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <Providers>
    <html lang="en" className={`${inter.variable} ${roboto_mono.variable} ${rubik.variable} ${diphylleia.variable}`}>
        <body className='bg-[#702707]'>
          <section className={styles.container}>
            <Nav />
            <main className={styles.main}>{props.children}</main>
          </section>
        </body>
      </html>
    </Providers>
  )
}
