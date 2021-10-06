import "dotenv/config";
import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/UserResolver";
import { createConnection } from "typeorm";
const cookieParser = require("cookie-parser");
import { verify } from "jsonwebtoken";
import cors from "cors";
import { User } from "./entity/User";
import { sendRefreshToken } from "./auth/sendRefreshToken";
import { createAccessToken, createRefreshToken } from "./auth/auth";
import { ScheduleResolver } from "./resolvers/ScheduleResolver";
import { TeamResolver } from "./resolvers/TeamResolver";
import { PostResolver } from "./resolvers/PostResolver";
import { AuthResolver } from "./resolvers/AuthResolver";
import { getUserBuilder } from "./utils/userBuilder";

(async () => {
  const app = express();
  app.use(
    cors({
      origin: process.env.ORIGIN,
      credentials: true,
    })
  );
  app.use("/refresh_token", cookieParser());
  app.get("/", (_req, res) => res.send("hello"));

  app.get("/users", async (req, res) => {
    const authorization = req.headers.authorization;
  if (!authorization) {
    throw new Error("not authenticated");
  }
    try {
      const token = authorization.split(" ")[1];
      const payload: any = verify(
        token,
        process.env.ACCESS_TOKEN_SECRET!
      );

      console.log(payload!.userId);
      const user = (await User.findOne({
        where: { id: payload!.userId },
      })) || { isAdmin: "" };
      if (user) {
        const builder = getUserBuilder(18);
        const users = await builder.getMany();
        return res.send(users);
      }
      return res.send("error");
    } catch (error) {
      return res.send(error.message);
    }
  });
  app.post("/refresh_token", async (req, res) => {
    const token = req.cookies.jid;
    if (!token) {
      return res.send({ ok: false, accessToken: "", companyId: "" });
    }

    let payload: any = null;
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
    } catch (err) {
      console.log(err);
      return res.send({ ok: false, accessToken: "", user: null });
    }

    // token is valid and
    // we can send back an access token
    const user = await User.findOne({ id: payload.userId });

    if (!user) {
      return res.send({ ok: false, accessToken: "", user: null });
    }

    if (user.tokenVersion !== payload.tokenVersion) {
      return res.send({ ok: false, accessToken: "", user: null });
    }

    sendRefreshToken(res, createRefreshToken(user));

    return res.send({
      ok: true,
      accessToken: createAccessToken(user),
      user: user,
    });
  });

  await createConnection();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        UserResolver,
        ScheduleResolver,
        TeamResolver,
        PostResolver,
        AuthResolver,
      ],
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app, cors: false });
  app.listen(4000, () => {
    console.log("express server started");
  });
})();
