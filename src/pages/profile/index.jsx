import MainLayout from "../../components/layouts/main-layouts";
import Head from "next/head";
import {getSession} from "next-auth/react";
import global from '../../../styles/main.module.css'
import {Tooltip, Card} from "antd";
import {EditOutlined, EllipsisOutlined, SettingOutlined} from "@ant-design/icons";
import {getEllipsisText} from "../../helpers/string.helpers";
import Image from "next/image";


function User({user}) {

  const userDetails = (user) => {

    return (  <Card
      hoverable
      style={{width: 300, margin: "15px"}}
      cover={
        <Image
          alt="example"
          src="https://designimages.appypie.com/browsebydisplayimage/babypenguin.gif"
        />
      }
      actions={[
        <SettingOutlined key="setting"/>,
        <EditOutlined key="edit"/>,
        <EllipsisOutlined key="ellipsis"/>,
      ]}
    >
      <Card.Meta
        title={<Tooltip placement={'topLeft'} title={`Address: ${user.address}`}>
          <h3>{getEllipsisText(user.address, 4)}</h3>
        </Tooltip>}
        description={<div>
          <Tooltip placement={"topLeft"} title={`Profile ID: ${user.profileId}`}>
            <h3>Profile ID: {getEllipsisText(user.profileId,)}</h3>
          </Tooltip>
          <Tooltip placement={'topLeft'} title={`Signature: ${user.signature}`}>
            <h3>Signature: {getEllipsisText(user.signature)}</h3>
          </Tooltip>
        </div>}
      />
    </Card>)
  }

  return (<section>
    <h2>User Profile</h2>
    <div className={global.main}>
      {userDetails(user)}
    </div>
  </section>)
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  // redirect to homepage if not authenticated
  if (!session) {
    return {
      redirect: {
        destination: '/', permanent: false
      }
    }
  }

  return {
    props: {
      user: session.user,
    }
  }
}

export default User

User.getLayout = function getLayout(page) {
  return (<MainLayout>
    <Head>
      <title>Web3 DApp | User Profile</title>
      <meta name="description" content="Web3 - NFT Application"/>
      <link rel="icon" href="/favicon.ico"/>
    </Head>
    {page}
  </MainLayout>)
}
