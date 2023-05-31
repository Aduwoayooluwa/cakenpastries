import '@/styles/globals.css'
import type { AppProps } from 'next/app'
// pages/_app.js
import { ChakraProvider } from '@chakra-ui/react'
import localFont from 'next/font/local';
import { theme } from '@/utils/theme';
import BottomNavigation from '@/Layout/BottomNav';
import Footer from '@/Layout/Footer';
import { Provider } from 'jotai';
import { myFont } from '@/utils/fontStyles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from '@/Layout/Navbar';


const queryClient = new QueryClient()

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
    <Provider>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <Navbar />
          <Component {...pageProps} />
          
          <BottomNavigation />
          <Footer />
        </ChakraProvider>
      </QueryClientProvider>
      
    </Provider>
    
    </>
    
  )
}

export default MyApp;