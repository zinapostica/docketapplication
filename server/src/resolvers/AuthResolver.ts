import {
    Resolver,
    Mutation,
    Arg,
    Ctx,
    Int,
  } from "type-graphql";
  import { compare, hash } from "bcryptjs";
  import { User } from "../entity/User";
  import { MyContext } from "../auth/MyContext";
  import {
    createRefreshToken,
    createAccessToken,
    createPassResetToken,
  } from "../auth/auth";
  import { sendRefreshToken } from "../auth/sendRefreshToken";
  import { getConnection } from "typeorm";
  import { verify } from "jsonwebtoken";
  import { Company } from "../entity/Company";
  import {
    ChangePasswordResponse,
    LoginResponse,
  } from "../entity/graphqlObjectTypes/ObjectTypes";
  import { sendEmail } from "../auth/sendEmails";
  
  @Resolver()
  export class AuthResolver {

  
    @Mutation(() => Boolean)
    async logout(@Ctx() { res }: MyContext) {
      sendRefreshToken(res, "");
      return true;
    }
  
    @Mutation(() => Boolean)
    async revokeRefreshTokensForUser(@Arg("userId", () => Int) userId: number) {
      await getConnection()
        .getRepository(User)
        .increment({ id: userId }, "tokenVersion", 1);
  
      return true;
    }
  
    @Mutation(() => LoginResponse)
    async login(
      @Arg("email") email: string,
      @Arg("password") password: string,
      @Ctx() { res }: MyContext
    ): Promise<LoginResponse> {
      const user = await User.findOne({ where: { email } });
  
      if (!user) {
        throw new Error("could not find user");
      }
  
      const valid = await compare(password, user.password);
  
      if (!valid) {
        throw new Error("bad password");
      }
  
      // login successful
  
      sendRefreshToken(res, createRefreshToken(user));
  
      return {
        accessToken: createAccessToken(user),
        user,
      };
    }
  
    @Mutation(() => Boolean)
    async register(
      @Arg("email") email: string,
      @Arg("password") password: string,
      @Arg("firstName") firstName: string,
      @Arg("lastName") lastName: string,
      @Arg("companyName") companyName: string
    ) {
      const hashedPassword = await hash(password, 12);
  
      try {
        await Company.insert({ name: companyName });
        const company = await Company.findOne({ where: { name: companyName } });
        await User.insert({
          email,
          password: hashedPassword,
          firstName: firstName,
          lastName: lastName,
          isAdmin: true,
          isOTP: false,
          company: company,
        });
      } catch (err) {
        console.log(err);
        return false;
      }
  
      return true;
    }
  
    @Mutation(() => ChangePasswordResponse)
    async changePassword(
      @Arg("currentPassword") currentPassword: string,
      @Arg("newPassword") newPassword: string,
      @Ctx() context: MyContext
    ): Promise<ChangePasswordResponse> {
      const authorization = context.req.headers["authorization"];
  
      if (!authorization) {
        return { message: "Not authorized", isChanged: false };
      }
      if (currentPassword === newPassword) {
        return {
          message: "New password should be different from the current password",
          isChanged: false,
        };
      }
  
      try {
        const token = authorization.split(" ")[1];
        const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
        const user = await User.findOne(payload.userId);
  
        if (user) {
          console.log(user);
          const valid = await compare(currentPassword, user.password);
  
          if (!valid) {
            throw new Error("Bad password");
          }
          const hashedPassword = await hash(newPassword, 12);
          user.password = hashedPassword;
          user.save();
          return { message: "Password changed successfully", isChanged: true };
        }
      } catch (err) {
        console.log(err.message);
        return { message: err.message, isChanged: false };
      }
      return { message: "Could not change password", isChanged: false };
    }

  
    @Mutation(() => Boolean)
    async forgotPassword(@Arg("email") email: string) {
      try {
        const user = await User.findOne({ where: { email } });
        console.log(email, user);
        if (user) {
          const token = createPassResetToken(user);
          sendEmail(
            email,
            `You have requested a password reset on docketapp@${user.company.name}`,
            `Please follow this link to change your password: ${
              process.env.ORIGIN! + "/changeForgottenPassword/" + token
            }`
          );
          user.tokenVersion = user.tokenVersion + 1;
          user.save();
          return true;
        }
        return false;
      } catch (err) {
        console.log(err);
        return false;
      }
    }
  
    @Mutation(() => Boolean)
    async changeForgottenPassword(
      @Arg("token") token: string,
      @Arg("newPassword") newPassword: string
    ) {
      try {
        const payload: any = verify(token, process.env.RESET_PASS_TOKEN_SECRET!);
        const user = await User.findOne({ where: { id: payload.userId } });
        if (user && user.tokenVersion === payload.tokenVersion) {
          const hashedPassword = await hash(newPassword, 12);
          user.password = hashedPassword;
          await user.save();
          return true;
        }
        return false;
      } catch (err) {
        return false;
      }
    }
  }
  