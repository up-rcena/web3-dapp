import Moralis from "moralis";

const { MORALIS_API_KEY } = process.env

export default async function handler(req, res) {
  await Moralis.start({
    apiKey: MORALIS_API_KEY,
  });

  const address = process.env.MORALIS_ADDRESS;

  const [nativeBalance, tokenBalances] = await Promise.all([
    Moralis.EvmApi.account.getNativeBalance({ address }),
    Moralis.EvmApi.account.getTokenBalances({ address }),
  ]);
  res.status(200).json({
    nativeBalance: nativeBalance.result.balance.ether,
    tokenBalances: tokenBalances.result.map((token) => token.display()),
  });
}
