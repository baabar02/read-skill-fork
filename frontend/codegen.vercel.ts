// codegen.vercel.ts - Vercel-specific configuration
import type { CodegenConfig } from "@graphql-codegen/cli";

console.log("🔧 Using Vercel-specific codegen configuration");
console.log("📁 Schema file: ./src/graphql/schema.graphql");

const config: CodegenConfig = {
  schema: "./src/graphql/schema.graphql", // Always use local schema on Vercel
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
