import {
  Resolver,
  Mutation,
  Arg,
  Ctx,
  UseMiddleware,
  Query,
} from "type-graphql";

import { MyContext } from "../auth/MyContext";
import { isAdmin, isAuth } from "../auth/isAuth";
import { paginate } from "../utils/pagination";
import {
  Appointment,
  GetScheduleResponse,
} from "../entity/graphqlObjectTypes/ObjectTypes";
import { getUserBuilder } from "../utils/userBuilder";
import { PatternDetails } from "../entity/PatternDetails";
import { WorkPattern } from "../entity/WorkPattern";

@Resolver()
export class ScheduleResolver {
  @Query(() => GetScheduleResponse, { nullable: true })
  @UseMiddleware(isAuth)
  async getSchedule(
    @Arg("perPage", { nullable: true }) perPage: number = 10,
    @Arg("page", { nullable: true }) page: number = 1,
    @Ctx() { payload }: MyContext
  ) {
    try {
      if (payload) {
        const builder = getUserBuilder(payload!.company.id);
        const { total, records } = await paginate(builder, page, perPage);

        const resources = [
          {
            fieldName: "userId",
            title: "User",
            instances: records.map((el: any) => ({
              text: el.firstName + " " + el.lastName,
              id: el.id,
              color: "#2196f3",
            })),
          },
          {
            fieldName: "type",
            title: "Appointment type",
            instances: [
              {
                text: "Work",
                id: 0,
                color: "#2196f3",
              },
              {
                text: "PTO",
                id: 1,
                color: "#3f51b5",
              },
            ],
          },
        ];
        console.log(records);
        const appointments: Appointment[] = [];
        records.forEach((user: any) => {
          if (user.workPatterns) {
            user.workPatterns.forEach((workPattern: any) => {
              if (workPattern.patternDetails) {
                console.log(workPattern.id);
                workPattern.patternDetails.forEach((patternDetail: any) => {
                  appointments.push({
                    ...patternDetail,
                    userId: user.id,
                    workPatternId: workPattern.id,
                    id: appointments ? appointments.length : 0,
                    patternDetailId: patternDetail.id,
                  });
                });
              }
            });
          }
        });
        return {
          resources: resources,
          appointments: appointments ? appointments : [],
          total,
        };
      }
    } catch (err) {
      console.log(err);
      return [];
    }
    return [];
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAdmin)
  async addPatternDetail(
    @Arg("startDate", () => String) startDate: Date,
    @Arg("endDate", () => String) endDate: Date,
    @Arg("workPatternId", () => Number) workPatternId: Number,
    @Arg("rRule", () => String, { nullable: true }) rRule: String = "",
    @Arg("exDate", () => String, { nullable: true }) exDate: String = "",
    @Arg("type", () => Number, { nullable: true }) type: number = 0
  ) {
    try {
      const workPattern = await WorkPattern.findOne({
        where: { id: workPatternId },
      });
      if (workPattern) {
        const res = PatternDetails.create({
          startDate: startDate,
          endDate: endDate,
          workPattern: workPattern,
          rRule: rRule,
          exDate: exDate,
          type: type,
        });
        res.save();
      }
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAdmin)
  async editPatternDetail(
    @Arg("startDate", () => String) startDate: Date,
    @Arg("endDate", () => String) endDate: Date,
    @Arg("patternDetailId", () => Number) patternDetailId: Number,
    @Arg("rRule", () => String, { nullable: true }) rRule: String,
    @Arg("exDate", () => String, { nullable: true }) exDate: String,
    @Arg("type", () => Number, { nullable: true }) type: number
  ) {
    try {
      let patternDetail = await PatternDetails.findOne({
        where: { id: patternDetailId },
      });
      if (patternDetail) {
        patternDetail.startDate = startDate;
        patternDetail.endDate = endDate;
        patternDetail.rRule = rRule ? rRule : "";
        patternDetail.exDate = exDate ? exDate : "";
        patternDetail.type = type ? type : 0;
        await patternDetail.save();
      }
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAdmin)
  async deletePatternDetail(
    @Arg("patternDetailId", () => Number) patternDetailId: Number
  ) {
    try {
      let patternDetail = await PatternDetails.findOne({
        where: { id: patternDetailId },
      });
      if (patternDetail) await patternDetail.remove();
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  }
}
