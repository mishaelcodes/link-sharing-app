import { Instrument_Sans } from 'next/font/google'

export const instrument_sans_init = Instrument_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--instrumnt_sans',
  weight: ['400', '700']
})

export const instrument_sans = instrument_sans_init.variable