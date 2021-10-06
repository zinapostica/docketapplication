import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";
import { ObjectType, Field, Int, InputType } from "type-graphql";
import { Company } from "./Company";
import { Team } from "./Team";
import { WorkPattern } from "./WorkPattern";
import { Post } from "./Post";

@ObjectType()
@InputType("UserInputType")
@Entity("users")
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column("varchar", { unique: true })
  email: string;

  @Column("text")
  password: string;

  @Column("int", { default: 0 })
  tokenVersion: number;

  @Field({ nullable: true })
  @Column("text", { nullable: false })
  firstName: string;

  @Field({ nullable: true })
  @Column("text", { nullable: false })
  lastName: string;

  @Field(() => String, { nullable: true })
  @Column("date", { nullable: true })
  startDate: Date;

  @Field({ nullable: true })
  @Column({ nullable: false, default: true })
  isOTP: boolean;

  @Field({ nullable: true })
  @Column({ nullable: false, default: false })
  isAdmin: boolean;

  @Field(() => Company, { nullable: true })
  @ManyToOne(() => Company, {
    nullable: false,
    eager: true,
  })
  company: Company;

  @Field(() => [Team], { nullable: true })
  @ManyToMany(() => Team, (team) => team.users, {
    nullable: true,
    cascade: ["insert", "update"],
  })
  @JoinTable({ name: "team_members" })
  teams: Team[];

  @Field(() => [WorkPattern], { nullable: true })
  @OneToMany(() => WorkPattern, (workPattern) => workPattern.user, {
    nullable: true,
    cascade: ["insert", "update", "remove"],
  })
  workPatterns: WorkPattern[];

  @Field(() => [Post], { nullable: true })
  @OneToMany(() => Post, (post) => post.user, {
    nullable: true,
    cascade: ["insert", "update", "remove"],
  })
  posts: Post[];

  @Field(() => [Post], { nullable: true })
  @ManyToMany(() => Post, (post) => post.seenUsers, {
    nullable: true,
    cascade: ["insert", "update"],
  })
  @JoinTable({ name: "seen_posts" })
  seenPosts: Post[];
}
