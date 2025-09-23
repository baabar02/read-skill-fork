import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schemas/common.schema";
import { resolvers } from "./resolvers";
import { connectToDb } from "./utils/connect-to-db";
import jwt from "jsonwebtoken";
import type { IncomingMessage, ServerResponse } from "http";

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
  context: async ({ req, res }: { req: IncomingMessage; res: ServerResponse }): Promise<MyContext> => {
    // Handle CORS preflight requests
    if (req.method === "OPTIONS") {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
      res.setHeader("Access-Control-Max-Age", "86400");
      res.writeHead(200);
      res.end();
      return { userId: undefined };
    }

    // Add CORS headers for all requests
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

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
