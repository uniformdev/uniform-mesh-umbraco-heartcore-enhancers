import getConfig from 'next/config';
import { Client, ClientOptions } from '@umbraco/headless-client';
import { createHeartcoreEnhancer } from './createEnhancer'

const { serverRuntimeConfig } = getConfig();
const { heartcoreProjectAlias, heartcoreApiKey } = serverRuntimeConfig;

export const heartcoreEnhancer = () => {
  if (!heartcoreProjectAlias) {
    throw new Error('UMBRACO_HEARTCORE_PROJECT_ALIAS env not set.');
  }

  if (!heartcoreApiKey) {
    throw new Error('UMBRACO_HEARTCORE_API_KEY env not set.');
  }

  const client = new Client({
    projectAlias: heartcoreProjectAlias,
    apiKey: heartcoreApiKey
  } as ClientOptions)

  return createHeartcoreEnhancer({
    clients: client
  });
};
