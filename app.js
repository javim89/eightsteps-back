import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { createServer } from "http";
import express from "express";
import { useServer } from "graphql-ws/lib/use/ws";
import bodyParser from "body-parser";
import cors from "cors";
import { PubSub } from "graphql-subscriptions";
import { WebSocketServer } from "ws";
import { UserTypeDefs, RoomTypeDefs, StepTypeDefs } from "./typeDefs/index.js";
import { UserResolvers, RoomResolvers } from "./resolvers/index.js";
import { connectDB } from "./db.js";

const schema = makeExecutableSchema({
  typeDefs: [UserTypeDefs, RoomTypeDefs, StepTypeDefs],
  resolvers: [UserResolvers, RoomResolvers],
});

const app = express();
const pubSub = new PubSub();

connectDB();
const httpServer = createServer(app);
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});

const serverCleanup = useServer({
  schema,
  context: async () => ({
    pubSub,
  }),
}, wsServer);

const server = new ApolloServer({
  schema,
  plugins: [
    // Proper shutdown for the HTTP server.
    ApolloServerPluginDrainHttpServer({ httpServer }),

    // Proper shutdown for the WebSocket server.
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

await server.start();
app.get("/", (req, res) => res.send("Visit /graphql"));
app.use("/graphql", cors(), bodyParser.json(), expressMiddleware(server, {
  context: async () => ({
    pubSub,
  }),
}));

const PORT = 3000;
// Now that our HTTP server is fully set up, we can listen to it.
httpServer.listen(PORT, () => {
  console.log(`Server is now running on http://localhost:${PORT}/graphql`);
});
