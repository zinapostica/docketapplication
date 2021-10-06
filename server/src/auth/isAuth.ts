import { MiddlewareFn } from "type-graphql";
import { verify } from "jsonwebtoken";
import { MyContext } from "./MyContext";
import { User } from "../entity/User";

// bearer 102930ajslkdaoq01

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  const authorization = context.req.headers["authorization"];
  if (!authorization) {
    throw new Error("not authenticated");
  }

  try {
    const token = authorization.split(" ")[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    context.payload = payload as any;
  } catch (err) {
    console.log(err);
    throw new Error("not authenticated");
  }

  return next();
};

export const isAdmin: MiddlewareFn<MyContext> = async ({ context }, next) => {
  const authorization = context.req.headers["authorization"];
  if (!authorization) {
    throw new Error("not authenticated");
  }
  try {
    const token = authorization.split(" ")[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    context.payload = payload as any;
    console.log(context.payload!.userId);
    const user = await User.findOne({ where: { id: context.payload!.userId } }) || { isAdmin: "" };
    if (!user.isAdmin) {
      throw new Error("not authorized");
    }
  } catch (err) {
    console.log(err);
    throw new Error("not authenticated");
  }
  return next();
};