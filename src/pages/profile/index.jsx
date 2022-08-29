import MainLayout from "../../components/layouts/main-layouts";
import Head from "next/head";
import {getSession} from "next-auth/react";
import global from '../../../styles/main.module.css'


function User({user}) {

  const userDetails = (user) => {

    return (<div style={{margin: 15}}>
      <h3>Address: {user.address}</h3>
      <h3>Profile ID: {user.profileId}</h3>
      <h3>Signature: {user.signature}</h3>
    </div>)
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
