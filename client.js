import { ApolloClient, InMemoryCache } from "@apollo/client";

// Apollo returns immutable data
const client = new ApolloClient({
  uri: process.env.WP_GRAPHQL_URL,
  cache: new InMemoryCache(),
});

export default client;
