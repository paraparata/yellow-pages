import { ApolloClient, InMemoryCache } from '@apollo/client';
import { offsetLimitPagination } from '@apollo/client/utilities';

const apolloCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        contact: offsetLimitPagination(['where', 'order_by']),
      },
    },
  },
});

export const apolloClient = new ApolloClient({
  uri: import.meta.env.VITE_GQL_SERVER_URL,
  cache: apolloCache,
});
