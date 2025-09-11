// frontend/app/providers.tsx
"use client";

import client from "@/lib/apollo";
import { ApolloProvider } from "@apollo/client/react";
import { ReactNode } from "react";

const ApolloWrapper = ({ children }: { children: ReactNode }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloWrapper;
