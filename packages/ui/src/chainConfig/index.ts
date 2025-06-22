import chainJson from '@/chain.json';
import type { ChainConfig } from '@/chainConfig/types';

const chainTypes = [
  typeof process !== 'undefined' && process.env ? process.env.NEXT_PUBLIC_CHAIN_TYPE : undefined,
];

function chainConfig() {
  /* Setting the basePath, chainType, chains, and settings variables. */
  const chainType = chainTypes.find((c) => !!c)?.toLowerCase() || 'mainnet';
  const { chains, ...settings } = chainJson;
  let chain = chains.find((c) => c.chainType?.toLowerCase() === chainType);
  if (!chain && chainType !== 'testnet') {
    chain = chains.find((c) => c.chainType?.toLowerCase() === 'testnet');
  }

  /* If the chainType is not found, it will use the first chain in the array. */
  if (!chain) [chain] = chains;
  if (!chain) throw new Error(`Config not found for CHAIN_NAME ${chainJson.chainName}`);

  const basePath = (
    (typeof process !== 'undefined' && process.env ? process.env.BASE_PATH : undefined) ||
    `${`/${settings.chainName}`}`
  ).replace(/^(\/|\/base)$/, '');

  /* Merging the settings and chain objects and processing environment variables. */
  const processedChain = {
    ...chain,
    endpoints: {
      ...chain.endpoints,
      graphql: chain.endpoints?.graphql?.replace(
        '${NEXT_PUBLIC_GRAPHQL_URL}',
        (typeof process !== 'undefined' && process.env
          ? process.env.NEXT_PUBLIC_GRAPHQL_URL
          : undefined) || chain.endpoints.graphql
      ),
      graphqlWebsocket: chain.endpoints?.graphqlWebsocket?.replace(
        '${NEXT_PUBLIC_GRAPHQL_WS}',
        (typeof process !== 'undefined' && process.env
          ? process.env.NEXT_PUBLIC_GRAPHQL_WS
          : undefined) || chain.endpoints.graphqlWebsocket
      ),
      publicRpcWebsocket: chain.endpoints?.publicRpcWebsocket?.replace(
        '${NEXT_PUBLIC_RPC_WEBSOCKET}',
        (typeof process !== 'undefined' && process.env
          ? process.env.NEXT_PUBLIC_RPC_WEBSOCKET
          : undefined) || chain.endpoints.publicRpcWebsocket
      ),
    },
  };

  return {
    ...settings,
    basePath,
    ...processedChain,
  } as unknown as ChainConfig;
}

export default chainConfig;
