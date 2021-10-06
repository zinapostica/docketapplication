import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { ObjectType, Field, InputType } from "type-graphql";
import { User } from "./User";
import { PatternDetails } from "./PatternDetails";

@ObjectType()
@InputType("WorkPatternsInputType")
@Entity("work_patterns")
export class WorkPattern extends BaseEntity {
  @Field(() => Number, { nullable: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String, { nullable: true })
  @Column("date", { nullable: false })
  startDate: Date;

  @Field(() => String, { nullable: true })
  @Column("date")
  endDate: Date;

  @Field(() => String, { nullable: true })
  @Column("date")
  repeatsOn: Date;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, {
    orphanedRowAction: "delete",
  })
  @JoinColumn()
  user: User;

  @Field(() => [PatternDetails], { nullable: false })
  @OneToMany(
    () => PatternDetails,
    (patternDetails) => patternDetails.workPattern,
    {
      cascade: ["insert", "update", "remove"],
      nullable: false,
    }
  )
  patternDetails: PatternDetails[];
}
