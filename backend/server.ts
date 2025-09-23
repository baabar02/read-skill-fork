import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs } from "./schemas/common.schema";
import { resolvers } from "./resolvers";
import { connectToDb } from "./utils/connect-to-db";
import jwt from "jsonwebtoken";
import cors from "cors";
import express from "express";

connectToDb();

interface MyContext {
  userId?: string;
}

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  introspection: true,
});

await server.start();

const app = express();

// Enable CORS for all origins
app.use(cors({
  origin: true, // Allow all origins
  credentials: true,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Parse JSON bodies
app.use(express.json());

// GraphQL endpoint
app.use('/graphql', expressMiddleware(server, {
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
}));

const port = Number(process.env.PORT || 4200);
app.listen(port, () => {
  console.log(`🚀 Apollo Server ready at http://localhost:${port}/graphql`);
});
