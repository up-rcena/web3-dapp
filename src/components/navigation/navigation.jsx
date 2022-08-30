import {ConnectButton} from '@rainbow-me/rainbowkit'
import {signIn, signOut, useSession} from 'next-auth/react'
import {useAccount, useSignMessage, useNetwork, useDisconnect } from 'wagmi'
import {useEffect} from 'react'
import {useRouter} from 'next/router'
import axios from 'axios'
import styles from './navigation.module.css'
import {Avatar, List, Popover} from "antd";
import {UserOutlined} from "@ant-design/icons";

function Navigation() {
  const {isConnected, address, status: accountStatus } = useAccount()
  const {chain} = useNetwork()
  const {status} = useSession()
  const {signMessageAsync} = useSignMessage()
  const { disconnectAsync } = useDisconnect();
  const {push} = useRouter()

  useEffect(() => {
    const handleAuth = async () => {
      const userData = {address, chain: chain.id, network: 'evm'}

      const {data} = await axios.post('/api/auth/request-message', userData, {
        headers: {
          'content-type': 'application/json',
        },
      })

      const message = data.message

      const signature = await signMessageAsync({message})

      // redirect profile after success authentication to '/profile' page
      const {url} = await signIn('credentials', {
        message, signature, redirect: false, callbackUrl: '/profile',
      })
      /**
       * instead of using signIn(..., redirect: "/profile")
       * we get the url from callback and push it to the router to avoid page refreshing
       */
      push(url)
    }

    if (status === 'unauthenticated' && isConnected) {
      handleAuth()
    }
  }, [status, isConnected])

  const handleProfile = () => {
    push('/profile')
  }

  const handleNFT = () => {
    push('/protected/nft')
  }

  const handleNative = () => {
    push('/native')
  }

  const handleSignOut = async () => {
    await signOut({redirect: '/'})
    await disconnectAsync({})
  }

  const handlePopoverMenu = () => {
    return (
      <List className={styles.menu_list}>
        <List.Item className={styles.menu_item_list}>
          <List.Item.Meta
            avatar={<Avatar size={36} icon={<UserOutlined/>} />}
            title={'Profile'}
            onClick={() => handleProfile()}
            className={styles.menu_item_meta}
          />
        </List.Item>
        <List.Item className={styles.menu_item_list}>
          <List.Item.Meta
            avatar={<Avatar size={36} icon={<UserOutlined/>} />}
            title={'NFT'}
            onClick={() => handleNFT()}
            className={styles.menu_item_meta}
          />
        </List.Item>
        <List.Item className={styles.menu_item_list}>
          <List.Item.Meta
            avatar={<Avatar size={36} icon={<UserOutlined/>} />}
            title={'Native'}
            onClick={() => handleNative()}
            className={styles.menu_item_meta}
          />
        </List.Item>
        <List.Item className={styles.menu_item_list}>
          <List.Item.Meta
            avatar={<Avatar size={36} icon={<UserOutlined/>} />}
            title={'SignOut'}
            onClick={() => handleSignOut()}
            className={styles.menu_item_meta}
          />
        </List.Item>
      </List>
    )
  }

  return (<nav className={styles.navigation}>
      <div>
        <Logo/>
      </div>
      <div className={styles.wallet_button_container}>
        <ConnectButton lable={"Sign In"}/>
        <Popover
          placement={'bottomRight'}
          title={<span>Logged User</span>}
          content={handlePopoverMenu}
          trigger={'hover'}
        >
          {status === 'authenticated' && accountStatus === 'connected' && (
            <Avatar
              size={42}
              icon={<UserOutlined/>}
              className={styles.signout}
            />
          )}
        </Popover>
      </div>
    </nav>)
}

export const Logo = () => (<div style={{display: "flex"}}>
    <svg
      width="60"
      height="38"
      viewBox="0 0 50 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M43.6871 32.3986C43.5973 32.4884 43.53 32.5782 43.4402 32.6905C43.53 32.6007 43.5973 32.5109 43.6871 32.3986Z"
        fill="black"
      />
      <path
        d="M49.7037 14.3715C49.5241 6.2447 42.7891 -0.17592 34.6624 0.00367768C31.0031 0.0934765 27.4784 1.53026 24.8294 4.06708C22.113 1.46291 18.4986 0.00367768 14.727 0.00367768C6.71246 0.00367768 0.202047 6.49164 0 14.5511V14.6633C0 20.8146 2.24497 26.2698 4.26545 30.0189C5.11853 31.5904 6.08387 33.117 7.13901 34.5762C7.5431 35.115 7.8574 35.564 8.10435 35.8559L8.39619 36.2151L8.48599 36.3273L8.50844 36.3498L8.53089 36.3722C10.2146 38.3253 13.1555 38.5498 15.1087 36.8886C15.1311 36.8661 15.1536 36.8437 15.176 36.8212C17.1291 35.0701 17.3312 32.0843 15.625 30.1087L15.6026 30.0638L15.423 29.8618C15.2658 29.6597 15.0189 29.3455 14.727 28.9414C13.9188 27.8189 13.178 26.6515 12.5269 25.4392C10.8881 22.4309 9.42888 18.6145 9.42888 14.7531C9.49623 11.8347 11.9432 9.52236 14.8617 9.58971C17.7128 9.65705 19.9802 11.9694 20.0251 14.8205C20.0476 15.5389 20.2272 16.2348 20.5415 16.8859C21.4844 19.3104 24.2232 20.5227 26.6478 19.5798C28.4438 18.8839 29.6336 17.1553 29.6561 15.2246V14.596C29.7683 11.6775 32.2153 9.38766 35.1562 9.47746C37.94 9.56726 40.1625 11.8122 40.2748 14.596C40.2523 17.6941 39.2645 20.7472 38.1421 23.1718C37.6931 24.1371 37.1992 25.08 36.6379 25.978C36.4359 26.3147 36.2787 26.5617 36.1665 26.6964C36.1216 26.7862 36.0767 26.8311 36.0542 26.8535L36.0318 26.876L35.9869 26.9433C37.6033 24.9004 40.5442 24.5412 42.5871 26.1576C44.4953 27.6617 44.9443 30.3781 43.6198 32.4211L43.6422 32.4435V32.3986L43.6647 32.3762L43.732 32.2864C43.7769 32.1966 43.8667 32.1068 43.9565 31.9721C44.1361 31.7027 44.3606 31.3435 44.6525 30.8945C45.3933 29.6822 46.0668 28.4026 46.673 27.1229C48.1097 24.0249 49.6812 19.5349 49.6812 14.5286L49.7037 14.3715Z"
        fill="#041836"
      />
      <path
        d="M39.7135 25.1249C37.1094 25.1025 34.9991 27.2127 34.9766 29.8169C34.9542 32.4211 37.0645 34.5313 39.6686 34.5538C41.1503 34.5538 42.5647 33.8578 43.4626 32.6905C43.53 32.6007 43.5973 32.4884 43.6871 32.3986C45.1015 30.221 44.4729 27.3025 42.2953 25.9107C41.532 25.3943 40.634 25.1249 39.7135 25.1249Z"
        fill="#B7E803"
      />
    </svg>
  </div>);


export default Navigation