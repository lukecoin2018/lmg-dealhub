import { DM_Sans } from 'next/font/google'

// DM Sans is loaded only where the LMG brand chrome is used (the /course
// landing page and the lesson shell), not site-wide. Apply `dmSans.variable`
// to the wrapper so `--font-dm-sans` resolves for styles/course-landing.css.
export const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' })
