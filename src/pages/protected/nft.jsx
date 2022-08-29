import Moralis from 'moralis'
import MainLayout from "../../components/layouts/main-layouts";
import Head from "next/head";
import {getSession} from "next-auth/react";

function NFT({message, nftList}) {

  return (
    <section>
      <h2>NFT Protected</h2>
      <p>{message}</p>
      <p>{JSON.stringify(nftList, null, 2)}</p>
    </section>
  )
}

export async function getServerSideProps(context) {
  const { MORALIS_API_KEY, MORALIS_ADDRESS } = process.env

  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  await Moralis.start({ apiKey: MORALIS_API_KEY })

  const nftList = await Moralis.EvmApi.account.getNFTsForContract({
    address: session.user.address,
    tokenAddress: MORALIS_ADDRESS
  })

  return {
    props: {
      message: nftList.raw.total > 0 ? 'Nice! You have our NFT' : 'Sorry, you don\'t have our NFT',
      nftList: nftList.raw.result
    }
  }
}

export default NFT;

NFT.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      <Head>
        <title>Web3 DApp | Native</title>
        <meta name="description" content="Web3 - Native" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {page}
    </MainLayout>
  )
}