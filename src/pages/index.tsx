import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import ProductsPage from '@/views/Products/ProductsPage'

const inter = Inter({ subsets: ['latin'] })

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
        <ProductsPage />
      </main>
    </>
  )
}
