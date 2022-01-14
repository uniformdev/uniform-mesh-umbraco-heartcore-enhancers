import { GraphQLClient } from 'graphql-request';
import getConfig from 'next/config';

const {
  serverRuntimeConfig: { heartcoreProjectAlias, heartcoreApiKey },
} = getConfig();

const client = new GraphQLClient('https://graphql.umbraco.io');
client.setHeaders({
  'Umb-Project-Alias': heartcoreProjectAlias,
  'Api-Key': heartcoreApiKey,
});

export const heartcoreGraphQLClient = client;