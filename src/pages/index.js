import Head from 'next/head'
import MainLayout from './../components/layouts/main-layouts';

function Home() {
  return (
    <section>
      Main
    </section>
  )
}

export default Home

Home.getLayout = function getLayout(page) {
  return (
    <MainLayout>
       <Head>
        <title>Web3 DApp</title>
        <meta name="description" content="Web3 - NFT Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {page}
  </MainLayout>
  )
}
