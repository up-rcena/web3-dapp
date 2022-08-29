import Moralis from 'moralis';


const { MORALIS_API_KEY, NEXTAUTH_URL, APP_DOMAIN } = process.env;

const config = {
  domain: APP_DOMAIN,
  statement: 'Please sign this message to confirm your identity.',
  uri: NEXTAUTH_URL,
  timeout: 60,
};

export default async function handler(req, res) {
  const { address, chain, network } = req.body;

  await Moralis.start({ apiKey: MORALIS_API_KEY });

  try {
    const message = await Moralis.Auth.requestMessage({
      address,
      chain,
      network,
      ...config,
    });

    res.status(200).json(message);
  } catch (error) {
    res.status(400).json({ error });
    console.error(error);
  }
}