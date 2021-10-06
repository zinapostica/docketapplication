import {
  Resolver,
  Mutation,
  Arg,
  Ctx,
  UseMiddleware,
  Query,
} from "type-graphql";
import { hash } from "bcryptjs";
import { User } from "../entity/User";
import { MyContext } from "../auth/MyContext";
import { isAdmin } from "../auth/isAuth";
import { sendEmail } from "../auth/sendEmails";
import { WorkPattern } from "../entity/WorkPattern";
import { PatternDetails } from "../entity/PatternDetails";
import { paginate } from "../utils/pagination";
import { Team } from "../entity/Team";
import { AllUsersResponse } from "../entity/graphqlObjectTypes/ObjectTypes";
import { getUserBuilder } from "../utils/userBuilder";
import { verify } from "jsonwebtoken";

@Resolver()
export class UserResolver {
  @Query(() => AllUsersResponse, { nullable: true })
  @UseMiddleware(isAdmin)
  async allUsers(
    @Ctx() { payload }: MyContext,
    @Arg("page", { nullable: true }) page: number = 1,
    @Arg("perPage", { nullable: true }) perPage: number = 10
  ) {
    const builder = getUserBuilder(payload!.company.id);
    const { records, total } = await paginate(builder, page, perPage);
    return { users: records, total };
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAdmin)
  async registerUser(
    @Ctx() { payload }: MyContext,
    @Arg("email") email: string,
    @Arg("firstName") firstName: string,
    @Arg("lastName") lastName: string,
    @Arg("startDate") startDate: Date,
    @Arg("isAdmin") isAdmin: boolean,
    @Arg("workPatterns", () => [WorkPattern], { nullable: true })
    workPatterns: WorkPattern[],
    @Arg("teams", () => [Team], { nullable: true }) teams: Team[]
  ) {
    const password = Math.random().toString(36).slice(-16);
    const hashedPassword = await hash(password, 12);

    try {
      const user = User.create({
        email,
        password: hashedPassword,
        firstName,
        lastName,
        isAdmin,
        isOTP: true,
        startDate,
        company: payload!.company,
      });
      if (workPatterns) await user.save();
      workPatterns.forEach(async (val) => {
        console.log("aabb", val.endDate, val.startDate);
        await this.addUserWorkPattern(
          user.id,
          val.startDate,
          val.repeatsOn,
          val.endDate,
          val.patternDetails
        );
      });
      if (teams)
        teams.forEach(async (val) => {
          await this.addUserToTeam(user.id, val.name);
        });
    } catch (err) {
      console.log(err);
      return false;
    }
    sendEmail(
      email,
      `You have been invited to docketapp@${payload!.company.name}`,
      `Your one time password is: ${password}`
    );
    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAdmin)
  async editUser(
    @Ctx() { payload }: MyContext,
    @Arg("userId") userId: number,
    @Arg("email") email: string,
    @Arg("firstName") firstName: string,
    @Arg("lastName") lastName: string,
    @Arg("startDate") startDate: Date,
    @Arg("isAdmin") isAdmin: boolean,
    @Arg("workPatterns", () => [WorkPattern], { nullable: true })
    workPatterns: WorkPattern[],
    @Arg("teams", () => [Team], { nullable: true }) teams: Team[]
  ) {
    try {
      console.log(workPatterns);
      const user = await getUserBuilder(payload!.company.id)
        .where("user.id =:id ", { id: userId })
        .getOne();
      if (user) {
        if (lastName !== user.lastName) {
          user.lastName = lastName;
        }
        if (firstName !== user.firstName) {
          user.firstName = firstName;
        }
        if (email !== user.email) {
          sendEmail(
            email,
            `Your email on docketapp@${payload!.company.name} has been changed`,
            `Your email on docketapp@${
              payload!.company.name
            } has been changed from ${user.email} to ${email}`
          );
          sendEmail(
            user.email,
            `Your email on docketapp@${payload!.company.name} has been changed`,
            `Your email on docketapp@${
              payload!.company.name
            } has been changed from ${user.email} to ${email}`
          );
          user.email = email;
        }
        if (startDate !== user.startDate) {
          user.startDate = startDate;
        }
        if (isAdmin !== user.isAdmin) {
          user.isAdmin = isAdmin;
        }
        if (teams) {
          teams.forEach(async (newTeam: Team) => {
            const exists = user.teams.find(
              (element) => element.name === newTeam.name
            );
            if (!exists) {
              const dbTeam = await Team.findOne({
                where: { name: newTeam.name },
              });
              if (dbTeam) user.teams.push(dbTeam);
            }
          });
          user.teams = user.teams.filter((team: Team) => {
            return teams.find((element) => element.name === team.name)
              ? true
              : false;
          });
        }

        if (workPatterns) {
          user.workPatterns = user.workPatterns.filter(({ startDate }) => {
            return workPatterns.find((element) => {
              return new Date(startDate) === new Date(element.startDate);
            })
              ? true
              : false;
          });
          workPatterns.forEach(async (workPattern: WorkPattern) => {
            const exists = user.workPatterns.find(({ startDate }) => {
              return new Date(startDate) == new Date(startDate);
            });
            if (!exists) {
              const newWorkPattern = WorkPattern.create({
                ...workPattern,
              });
              console.log("new wp: ", newWorkPattern);
              user.workPatterns.push(newWorkPattern);
              console.log("user wp: ", user.workPatterns);
            }
          });
        }

        console.log("endd", user);
        user.save().then(() => {
          console.log("end", user);
        });
      }
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAdmin)
  async addUserWorkPattern(
    @Arg("userId") userId: number,
    @Arg("startDate") startDate: Date,
    @Arg("repeatsOn") repeatsOn: Date,
    @Arg("endDate") endDate: Date,
    @Arg("patternDetails", () => [PatternDetails])
    patternDetails: PatternDetails[]
  ) {
    try {
      const user = await User.findOne({ where: { id: userId } });
      const workPattern = await WorkPattern.create({
        user,
        startDate,
        endDate,
        repeatsOn,
      }).save();
      console.log("wp", workPattern, startDate);

      patternDetails.forEach(async (value: PatternDetails) => {
        await PatternDetails.insert({
          workPattern,
          startDate: value.startDate,
          endDate: value.endDate,
          rRule: value.rRule,
        });
      });
    } catch (err) {
      console.log(err);
      return false;
    }

    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAdmin)
  async addUserToTeam(
    @Arg("userId") userId: number,
    @Arg("teamName") teamName: String
  ) {
    try {
      const user = await User.createQueryBuilder("user")
        .leftJoinAndSelect("user.teams", "teams")
        .where("user.id =:id ", { id: userId })
        .getOne();
      const team = await Team.findOne({ where: { name: teamName } });
      if (team && user) {
        user.teams.push(team);
        await user.save();
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }

    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAdmin)
  async deleteUser(
    @Ctx() { payload }: MyContext,
    @Arg("userId") userId: number
  ) {
    try {
      const user = await User.findOne({
        where: { id: userId, company: payload!.company },
      });
      if (user) {
        user.remove();
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  @Query(() => User, { nullable: true })
  me(@Ctx() context: MyContext) {
    const authorization = context.req.headers["authorization"];

    if (!authorization) {
      return null;
    }

    try {
      const token = authorization.split(" ")[1];
      const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
      return User.findOne(payload.userId);
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
