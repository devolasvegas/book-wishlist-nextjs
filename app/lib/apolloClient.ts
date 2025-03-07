import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const supabaseGraphQLUrl = process.env.SUPABASE_GRAPHQL_ENDPOINT;

const client = new ApolloClient({
  ssrMode: typeof window === "undefined",
  link: new HttpLink({
    uri: supabaseGraphQLUrl,
    headers: {
      apikey: process.env.SUPABASE_ANON_KEY as string,
    },
  }),
  cache: new InMemoryCache(),
});

export default client;
