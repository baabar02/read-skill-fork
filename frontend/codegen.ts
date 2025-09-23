// codegen.ts
import type { CodegenConfig } from "@graphql-codegen/cli";

// Try to use remote schema first, fallback to local schema
const remoteSchemaUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL ??
  "https://read-backend-tctp.onrender.com/graphql";
const localSchemaPath = "./src/graphql/schema.graphql";

const config: CodegenConfig = {
  schema:
    process.env.NODE_ENV === "production" && process.env.VERCEL
      ? localSchemaPath // Use local schema in production builds
      : remoteSchemaUrl, // Use remote schema in development
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
