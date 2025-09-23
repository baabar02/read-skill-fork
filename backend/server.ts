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
    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
      req.res?.setHeader('Access-Control-Allow-Origin', '*');
      req.res?.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      req.res?.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      req.res?.setHeader('Access-Control-Max-Age', '86400');
      req.res?.writeHead(200);
      req.res?.end();
      return { userId: undefined };
    }

    // Add CORS headers for all requests
    req.res?.setHeader('Access-Control-Allow-Origin', '*');
    req.res?.setHeader('Access-Control-Allow-Credentials', 'true');
    req.res?.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    req.res?.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

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
