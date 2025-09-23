// codegen.ts
import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "src/graphql/**/*.graphql", 
  generates: {
    "./src/generated/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-resolvers",
      ],
      config: {
        useIndexSignature: true,
        contextType: "./context#Context", 
        mappers: {

          Question: "../models/question-model#IQuestion",
        },
      },
    },
  },
};

export default config;