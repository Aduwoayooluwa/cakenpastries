import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
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
import { Toaster } from 'react-hot-toast';
import { Inter } from "next/font/google"
import { useRouter } from 'next/router';
import { CartProvider } from '@/context/CartContext';
import Cookies from 'js-cookie';

const queryClient = new QueryClient()
const inter = Inter({ subsets: ['latin'] });

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    const isAuth = Cookies.get('token')

    if (isAuth && router.asPath === "/login") {
      router.push('/')
      return 
    }

    if (isAuth && router.asPath === "/register") {
      router.push('/')
    }
  }, [router])
  return (
    <>
        <style jsx global>
      {`
        :root {
          --font-rubik: ${inter.style.fontFamily};
        }
      `}
    </style>
    <Provider>
      <CartProvider>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <Navbar />
          <Component {...pageProps} />
          
          <BottomNavigation />
          <Footer />
          <Toaster />
        </ChakraProvider>
      </QueryClientProvider>
      </CartProvider>
      
    </Provider>
    
    </>
    
  )
}

export default MyApp;