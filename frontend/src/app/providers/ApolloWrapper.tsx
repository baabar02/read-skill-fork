"use client";

import client from "@/lib/apollo";
import { ApolloProvider } from "@apollo/client/react";
import { ReactNode } from "react";
import { UserProvider } from "./UserProvider";

const ApolloWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <ApolloProvider client={client}>
      <UserProvider>{children}</UserProvider>
    </ApolloProvider>
  );
};

export default ApolloWrapper;
