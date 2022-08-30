import {
  createClient,
  configureChains,
  defaultChains,
  WagmiConfig,
} from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { SessionProvider} from "next-auth/react";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";

import '../../styles/globals.css'
import "@rainbow-me/rainbowkit/styles.css";
import "~antd/dist/antd.css";

const { provider, webSocketProvider, chains } = configureChains(defaultChains, [
  publicProvider(),
]);

const { connectors } = getDefaultWallets({
  appName: "Web3 App",
  chains,
});

const client = createClient({
  provider,
  webSocketProvider,
  autoConnect: true,
  connectors, // added connectors from rainbowkit
});

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
      <WagmiConfig client={client}>
        <SessionProvider session={pageProps.session} refetchInterval={0}>
          <RainbowKitProvider chains={chains}>
            {getLayout(<Component {...pageProps} />)}
          </RainbowKitProvider>
        </SessionProvider>
      </WagmiConfig>
  )
}

export default MyApp