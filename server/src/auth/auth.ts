import { User } from "../entity/User";
import { sign } from "jsonwebtoken";

export const createAccessToken = (user: User) => {
  return sign(
    { userId: user.id, company: user.company },
    process.env.ACCESS_TOKEN_SECRET!,
    {
      expiresIn: "30d",
    }
  );
};

export const createRefreshToken = (user: User) => {
  return sign(
    { userId: user.id, company: user.company, tokenVersion: user.tokenVersion },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: "60d",
    }
  );
};

export const createPassResetToken = (user: User) => {
  return sign(
    { userId: user.id, company: user.company, tokenVersion: user.tokenVersion },
    process.env.RESET_PASS_TOKEN_SECRET!,
    {
      expiresIn: "3d",
    }
  );
};
