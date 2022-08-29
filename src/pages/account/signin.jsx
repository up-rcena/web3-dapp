import MainLayout from "../../components/layouts/main-layouts";
import Head from "next/head";


function SignIn() {

  return (
    <section></section>
  )
}

SignIn.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      <Head>
        <title>Web3 DApp | Sign-in</title>
        <meta name="description" content="Web3 - NFT Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {page}
    </MainLayout>
  )
}
