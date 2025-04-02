import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const hasuraUrl = process.env.HASURA_GRAPHQL_ENDPOINT;
const hasuraAdminSecret = process.env.HASURA_ADMIN_SECRET;

const client = new ApolloClient({
  ssrMode: typeof window === "undefined",
  link: new HttpLink({
    uri: hasuraUrl,
    headers: {
      "x-hasura-admin-secret": hasuraAdminSecret as string,
    },
  }),
  cache: new InMemoryCache(),
});

export default client;
