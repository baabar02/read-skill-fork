// codegen.ts
import type { CodegenConfig } from "@graphql-codegen/cli";

const rawSchemaUrl = process.env.BACKEND_URL || "http://localhost:4200";
const schemaUrl = rawSchemaUrl.endsWith("/graphql")
  ? rawSchemaUrl
  : `${rawSchemaUrl.replace(/\/$/, "")}/graphql`;

const config: CodegenConfig = {
  schema: schemaUrl,
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
};

export default config;
