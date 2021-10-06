import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  UseMiddleware,
} from "type-graphql";
import { User } from "../entity/User";
import { MyContext } from "../auth/MyContext";
import { isAdmin, isAuth } from "../auth/isAuth";
import { Team } from "../entity/Team";
import { AddTeamResponse } from "../entity/graphqlObjectTypes/ObjectTypes";

@Resolver()
export class TeamResolver {
  @Query(() => [Team], { nullable: true })
  @UseMiddleware(isAuth)
  async allTeams(@Ctx() { payload }: MyContext) {
    try {
      const teams = await Team.find({ where: { company: payload!.company } });
      return teams;
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  @Mutation(() => AddTeamResponse)
  @UseMiddleware(isAdmin)
  async addTeam(
    @Ctx() { payload }: MyContext,
    @Arg("name") name: string,
    @Arg("users", () => [User], { nullable: true }) users: User[]
  ) {
    try {
      const team = Team.create({
        name,
        users,
        company: payload!.company,
      });
      team.save();
      return {
        team,
        success: true,
      };
    } catch (err) {
      console.log(err);
      return { success: false };
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAdmin)
  async deleteTeam(@Ctx() { payload }: MyContext, @Arg("name") name: string) {
    try {
      const team = await Team.findOne({
        where: { company: payload!.company, name: name },
      });
      if (team) {
        team.remove();
        return true;
      }
      return false;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
