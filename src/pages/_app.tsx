import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
// pages/_app.js
import { Box, ChakraProvider, Text } from '@chakra-ui/react'
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
import Image from "next/image"
import { Link } from '@chakra-ui/next-js';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallbackRender from '@/views/others/ErrorFallbackRender';

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
      <ErrorBoundary FallbackComponent={ErrorFallbackRender}>
          <CartProvider>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider theme={theme}>
            <Navbar />
            <Component {...pageProps} />
            <Box cursor={"pointer"} position={"fixed"} bottom={{base: "10%", md: "0%"}} right="5%">
              <Link href="https://wa.me/" target='_blank' rel='noreferrer'>
                <Image src={"/whatsappIcon.webp"} alt="whatsapp icon" width={100} height={100} />
              </Link>
              
            </Box>
            <BottomNavigation />
            <Footer />
            <Toaster />
          </ChakraProvider>
        </QueryClientProvider>
        </CartProvider>
      </ErrorBoundary>
      
      
    </Provider>
    
    </>
    
  )
}

export default MyApp;