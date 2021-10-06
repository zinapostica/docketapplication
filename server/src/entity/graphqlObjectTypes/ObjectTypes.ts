import { Field, ObjectType } from "type-graphql";
import { Post } from "../Post";
import { Team } from "../Team";
import { User } from "../User";

@ObjectType()
export class AllUsersResponse {
  @Field(() => [User], { nullable: true })
  users: [User];
  @Field(() => Number, { nullable: true })
  total: Number;
}
@ObjectType()
export class Instance {
  @Field(() => String)
  text: String;

  @Field(() => Number)
  id: Number;

  @Field(() => String)
  color: String;
}

@ObjectType()
export class Resource {
  @Field(() => String)
  fieldName: String;

  @Field(() => String)
  title: String;

  @Field(() => [Instance])
  instances: [Instance];
}

@ObjectType()
export class Appointment {
  @Field(() => Number)
  id: Number;

  @Field()
  startDate: Date;

  @Field()
  endDate: Date;

  @Field()
  rRule: String;

  @Field()
  exDate: String;

  @Field(() => Number)
  userId: Number;

  @Field(() => Number)
  type: Number;

  @Field(() => Number)
  workPatternId: Number;

  @Field(() => Number)
  patternDetailId: Number;
}

@ObjectType()
export class GetScheduleResponse {
  @Field(() => [Resource])
  resources: [Resource] | [];

  @Field(() => Number, { nullable: true })
  total: Number;

  @Field(() => [Appointment], { nullable: true })
  appointments: [Appointment] | [];
}

@ObjectType()
export class LoginResponse {
  @Field()
  accessToken: string;
  @Field(() => User)
  user: User;
}

@ObjectType()
export class ChangePasswordResponse {
  @Field()
  message: string;
  @Field(() => Boolean)
  isChanged: Boolean;
}

@ObjectType()
export class AllTeamsResponse {
  @Field(() => [Team])
  teams: [Team];
  @Field(() => Number)
  total: Number;
}

@ObjectType()
export class AllPostsResponse {
  @Field(() => [Post])
  posts: [Post];
  @Field(() => Number)
  total: Number;
}

@ObjectType()
export class AddTeamResponse {
  @Field(() => Team, { nullable: true })
  team: Team;
  @Field(() => Boolean)
  success: Boolean;
}
