import MainLayout from "../../components/layouts/main-layouts";
import Head from "next/head";
import global from '../../../styles/main.module.css'
import Native from "../native";

function SignIn() {

  return (
    <section>
      <h2>Sign In</h2>
      <div className={global.main}>

      </div>
    </section>
  )
}

export default SignIn

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
