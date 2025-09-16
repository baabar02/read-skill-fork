import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schemas/common.schema";
import { resolvers } from "./resolvers";
import { connectToDb } from "./utils/connect-to-db";

connectToDb();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: Number(process.env.PORT || 4200) },
});

console.log(`🚀 Apollo Server ready at ${url}`);
