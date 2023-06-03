import Head from 'next/head'
import ProductsPage from '@/views/Products/ProductsPage'
import { Divider, Heading } from '@chakra-ui/react'
import HBar from '@/Layout/HBar'
import { Box } from '@chakra-ui/react'
export default function Home() {
  return (
    <>
      <Head>
        <title>Cake & Pastries</title>
        <meta name="description" content="Cake and Pastries Restaurant" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
              <Box>
                <HBar />
              </Box>
              <Divider orientation='horizontal'/>
              <ProductsPage />
      </main>
    </>
  )
}
