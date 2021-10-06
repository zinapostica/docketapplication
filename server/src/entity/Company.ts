import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { ObjectType, Field, Int, InputType } from "type-graphql";
import { User } from "./User";
import { Team } from "./Team";

@ObjectType()
@InputType("CompanyInputType")
@Entity("companies")
export class Company extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column("varchar", { unique: true })
  name: string;

  @Field(() => [User])
  @OneToMany(() => User, user => user.company)
  users: User[];

  @Field(() => [Team])
  @OneToMany(() => Team, team => team.company)
  teams: Team[];

}
