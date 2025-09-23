import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schemas/common.schema";
import { resolvers } from "./resolvers";
import { connectToDb } from "./utils/connect-to-db";
import jwt from "jsonwebtoken";

connectToDb();

interface MyContext {
  userId?: string;
}

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  introspection: true,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: Number(process.env.PORT || 4200) },
  context: async ({ req }): Promise<MyContext> => {
    const token = req.headers.authorization?.replace("Bearer ", "") || "";
    let userId: string | undefined;

    try {
      const decoded = jwt.verify(token, "your_jwt_secret") as {
        userId: string;
      };
      userId = decoded.userId;
    } catch {
      userId = undefined;
    }

    return { userId };
  },
});

console.log(`🚀 Apollo Server ready at ${url}`);
