import Moralis from 'moralis'
import MainLayout from "../../components/layouts/main-layouts";
import Head from "next/head";
import {EditOutlined, EllipsisOutlined, SettingOutlined} from '@ant-design/icons';
import {Avatar, Card} from 'antd'
import {EvmChain} from "@moralisweb3/evm-utils";
import global from '../../../styles/main.module.css'
import {getSession} from "next-auth/react";
import Image from "next/image";

function Native({nativeBalance, address, tokens, nfts}) {

  const mapNFT = (nft) => {
    const imageLoader = () => 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png';
    return nft.map((item, key) => (<Card
      key={key}
      hoverable
      style={{width: 300, margin: "15px"}}
      cover={
        <Image
          loader={imageLoader}
          alt="example"
          src="me.png"
          width={500}
          height={500}
        />
      }
      actions={[
        <SettingOutlined key="setting"/>,
        <EditOutlined key="edit"/>,
        <EllipsisOutlined key="ellipsis"/>,
      ]}
    >
      <Card.Meta
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random"/>}
        title={`Name: ${item.name}`}
        description={`Amount: ${item.amount}`}
      />
    </Card>))
  }

  return (
    <section>
      <h2>Native Balance</h2>
      <div className={global.main}>

        <div>
          <h3>Wallet: <span>{address}</span></h3>
          <h3>Native Balance: {nativeBalance}</h3>
          <div style={{display: "flex"}}>
            {mapNFT(nfts)}
          </div>
        </div>
      </div>
    </section>
  )
}

export async function getServerSideProps(context) {
  const {MORALIS_API_KEY, MORALIS_ADDRESS} = process.env

  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  await Moralis.start({apiKey: MORALIS_API_KEY})

  const chain = EvmChain.ETHEREUM;

  const address = MORALIS_ADDRESS;

  // Get native balance
  const nativeBalance = await Moralis.EvmApi.account.getNativeBalance({
    address,
    chain,
  })

  // Get token Balance
  const tokenBalances = await Moralis.EvmApi.account.getTokenBalances({address, chain})

  // Format the Balances to a readable output with the .display() method
  const tokens = tokenBalances.result.map((token) => token.display())

  //  Get the NFT
  const nftsBalances = await Moralis.EvmApi.account.getNFTs({
    address,
    chain,
    limit: 0
  })

  const nfts = nftsBalances.result.map((nft) => ({name: nft.result.name, amount: nft.result.amount}))

  return {
    props: {
      address,
      nativeBalance: nativeBalance.result.balance.ether,
      tokens,
      nfts
    }
  }
}

export default Native

Native.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      <Head>
        <title>Web3 DApp | Native</title>
        <meta name="description" content="Web3 - Native"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      {page}
    </MainLayout>
  )
}