import { ApolloClient, HttpLink } from "@apollo/client";
import { InMemoryCache } from "@apollo/client";

// Use production backend URL as default, fallback to localhost for development
const publicBackendUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL ??
  (process.env.NODE_ENV === "production"
    ? "https://echo-mind-fizz.onrender.com"
    : "http://localhost:4200");

console.log("🔧 Apollo Client Configuration:");
console.log("- NODE_ENV:", process.env.NODE_ENV);
console.log("- NEXT_PUBLIC_BACKEND_URL:", process.env.NEXT_PUBLIC_BACKEND_URL);
console.log("- Using backend URL:", publicBackendUrl);

const normalizedUrl = publicBackendUrl.endsWith("/graphql")
  ? publicBackendUrl
  : `${publicBackendUrl.replace(/\/$/, "")}/graphql`;

console.log("- Final GraphQL endpoint:", normalizedUrl);

const link = new HttpLink({
  uri: normalizedUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: "all",
    },
    query: {
      errorPolicy: "all",
    },
    mutate: {
      errorPolicy: "all",
    },
  },
});

export default client;
