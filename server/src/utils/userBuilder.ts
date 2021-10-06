import { User } from "../entity/User";

export const getUserBuilder = (companyId: number) => {
  return User.getRepository()
    .createQueryBuilder("user")
    .leftJoinAndSelect("user.teams", "teams")
    .leftJoinAndSelect("user.workPatterns", "work_patterns")
    .leftJoinAndSelect("work_patterns.patternDetails", "pattern_details")
    .leftJoinAndSelect("user.seenPosts", "posts")
    .where("user.companyId = :companyId", { companyId });
};


