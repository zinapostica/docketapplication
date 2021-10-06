import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
  ManyToOne,
} from "typeorm";
import { ObjectType, Field, Int, InputType } from "type-graphql";
import { User } from "./User";
import { Company } from "./Company";

@ObjectType()
@InputType("TeamInputType")
@Entity("teams")
export class Team extends BaseEntity {
  @Field(() => Int, { nullable: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column("varchar", { unique: true })
  name: string;

  @Field(() => [User], {nullable: true})
  @ManyToMany(() => User, user => user.teams)
  users: User[];

  @Field(() => Company, { nullable: true })
  @ManyToOne(() => Company, { nullable: false })
  company: Company;
}
