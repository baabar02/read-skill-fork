import { ApolloClient, HttpLink } from "@apollo/client";
import { InMemoryCache } from "@apollo/client";

const publicBackendUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:4000";
if (!publicBackendUrl) {
  throw new Error("NEXT_PUBLIC_BACKEND_URL is not set");
}

const normalizedUrl = publicBackendUrl.endsWith("/graphql")
  ? publicBackendUrl
  : `${publicBackendUrl.replace(/\/$/, "")}/graphql`;

const link = new HttpLink({
  uri: normalizedUrl,
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default client;
