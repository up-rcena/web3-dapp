import {Layout} from 'antd'
import Image from 'next/image'
import styles from '../../../styles/main.module.css'
import Navigation from '../navigation/navigation'

const {Header, Content, Footer} = Layout;

function MainLayout({children}) {

  return (<Layout style={{ minHeight: '100vh', overflow: 'auto'}}>
      <Header>
        <Navigation/>
      </Header>
      <Content className={styles.container}>{children}</Content>
      <Footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16}/>
          </span>
        </a>
      </Footer>
    </Layout>)

}

export default MainLayout