import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { Field, InputType, ObjectType } from "type-graphql";
import { WorkPattern } from "./WorkPattern";

@ObjectType()
@InputType("PatternDetailsInput")
@Entity("pattern_details")
export class PatternDetails extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column("datetime", { nullable: false })
  startDate: Date;

  @Field({ nullable: true })
  @Column("datetime", { nullable: false })
  endDate: Date;

  @Field({ nullable: true })
  @Column("varchar", { nullable: false })
  rRule: String;

  @Field({ nullable: true })
  @Column("varchar", { nullable: false })
  exDate: String;

  @Field(() => Number, { defaultValue: 0 })
  @Column("int", { nullable: false, default: 0 })
  type: number;

  @ManyToOne(() => WorkPattern, (workPattern) => workPattern.patternDetails, {
    orphanedRowAction: "delete",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  workPattern: WorkPattern;
}
