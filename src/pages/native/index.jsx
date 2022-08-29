import Moralis from  'moralis'
import MainLayout from "../../components/layouts/main-layouts";
import Head from "next/head";
import {EvmChain} from "@moralisweb3/evm-utils";


function Native({ nativeBalance, address }) {
  return (
    <section>
      <h2>Native Balance</h2>
      <p>Wallet: <span>{address}</span></p>
      <p>Native Balance: {nativeBalance}</p>
    </section>
  )
}

export async function getServerSideProps(context) {
  const { MORALIS_API_KEY, MORALIS_ADDRESS } = process.env

  await Moralis.start({ apiKey: MORALIS_API_KEY })

  const chain = EvmChain.ETHEREUM;

  const address =  MORALIS_ADDRESS;

  const nativeBalance = await Moralis.EvmApi.account.getNativeBalance({
    address,
    chain,
  })

  return {
    props: {
      address,
      nativeBalance: nativeBalance.result.balance.ether
    }
  }
}

export default Native

Native.getLayout = function getLayout(page) {
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