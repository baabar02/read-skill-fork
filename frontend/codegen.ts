// codegen.ts
import type { CodegenConfig } from "@graphql-codegen/cli";

// Try to use remote schema first, fallback to local schema
const remoteSchemaUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL ??
  // "https://echo-mind-fizz.onrender.com/graphql";
  "https://read-skill-fork-2.onrender.com/graphql";
const localSchemaPath = "./src/graphql/schema.graphql";

// Determine schema source - use local schema for production builds
const useLocalSchema =
  process.env.NODE_ENV === "production" || process.env.VERCEL || process.env.CI;

console.log("🔧 GraphQL Codegen Configuration:");
console.log("- NODE_ENV:", process.env.NODE_ENV);
console.log("- VERCEL:", process.env.VERCEL);
console.log("- CI:", process.env.CI);
console.log("- Using local schema:", useLocalSchema);
console.log(
  "- Schema path:",
  useLocalSchema ? localSchemaPath : remoteSchemaUrl
);

const config: CodegenConfig = {
  schema: useLocalSchema ? localSchemaPath : remoteSchemaUrl,
  documents: "graphql/**/*.graphql",
  generates: {
    "./graphql/generated.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        withHooks: true,
        reactApolloVersion: 3,
        withSuspense: false,
        useSuspenseQuery: false,
      },
    },
  },
  ignoreNoDocuments: true,
  silent: false,
  errorsOnly: false,
};

export default config;
