import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  ManyToOne,
  ManyToMany,
} from "typeorm";
import { ObjectType, Field, Int, InputType } from "type-graphql";
import { User } from "./User";
import { Team } from "./Team";
import { Company } from "./Company";

@ObjectType()
@InputType("PostInputType")
@Entity("posts")
export class Post extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column("varchar")
  content: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @Field(() => [User])
  @OneToMany(() => Team, (team) => team.company)
  teams: Team[];

  @Field()
  @Column("datetime", { nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Field(() => [User], { nullable: true })
  @ManyToMany(() => User, (user) => user.seenPosts)
  seenUsers: User[];

  @Field(() => Company)
  @ManyToOne(() => Company, {
    nullable: false,
    eager: true,
  })
  company: Company;
}
