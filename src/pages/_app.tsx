import '@/styles/globals.css'
import type { AppProps } from 'next/app'
// pages/_app.js
import { ChakraProvider } from '@chakra-ui/react'
import localFont from 'next/font/local';
import { theme } from '@/utils/theme';
import BottomNavigation from '@/Layout/BottomNav';
import Footer from '@/Layout/Footer';

const myFont = localFont({ src: [
  {
    path: '../assets/fonts/Graphik-Regular.woff2',
    weight: '400',
    style: 'normal',
  },
  {
    path: '../assets/fonts/Graphik-Medium.woff2',
    weight: '400',
    style: 'italic',
  },
  {
    path: '../assets/fonts/Graphik-Semibold.woff2',
    weight: '700',
    style: 'normal',
  }
] });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
        <style jsx global>
      {`
        :root {
          --font-rubik: ${myFont.style.fontFamily};
        }
      `}
    </style>

    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
      <Footer />
      <BottomNavigation />
    </ChakraProvider>
    </>
    
  )
}

export default MyApp;