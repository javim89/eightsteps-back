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
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";
import typeDefs from "./typeDefs/index.js";
import resolvers from "./resolvers/index.js";
import { connectDB } from "./db.js";
import startSeeders from "./seed/index.js";
import startSchedulers from "./schedulers/init.js";

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const app = express();
const pubSub = new PubSub();
dotenv.config();

connectDB();
const httpServer = createServer(app);
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});

const getUser = async (token) => {
  try {
    if (token) {
      const user = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
      return user;
    }
    return null;
  } catch (error) {
    return null;
  }
};
const serverCleanup = useServer({
  schema,
  context: async ({ req, res }) => {
    // Get the user token from the headers.
    const token = req.headers.authorization || "";
    // Try to retrieve a user with the token
    const user = await getUser(token);

    // Add the user to the context
    return { user, res, pubSub };
  },
}, wsServer);

const server = new ApolloServer({
  schema,
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
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

startSeeders();
await server.start();
startSchedulers(pubSub);

const corsOptions = {
  origin: ["http://localhost:5173", "https://graphql.api.apollographql.com"],
  credentials: true, // <-- REQUIRED backend setting
};

app.use(cookieParser("secret"));
app.get("/", (req, res) => res.send("Visit /graphql"));
app.use("/graphql", cors(corsOptions), bodyParser.json(), expressMiddleware(server, {
  context: async ({ req, res }) => {
    // Get the user token from the headers.
    // console.log(req.headers.authorization);
    // Cookies that have not been signed
    // console.log("token: ", req.cookies.token);
    // console.log("token: ", req.signedCookies.token);

    const token = req.cookies.token || "";

    // Try to retrieve a user with the token
    const user = await getUser(token);

    // Add the user to the context
    return { user, res, pubSub };
  },
}));

const PORT = 3000;
// Now that our HTTP server is fully set up, we can listen to it.
httpServer.listen(PORT, () => {
  console.log(`Server is now running on http://localhost:${PORT}/graphql`);
});
