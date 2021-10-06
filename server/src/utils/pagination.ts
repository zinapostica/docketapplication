import { BaseEntity, SelectQueryBuilder } from "typeorm";

export const paginate: any = async (
  builder: SelectQueryBuilder<BaseEntity>,
  page: number,
  perPage: number
) => {
  const total = await builder.getCount();
  console.log(page, " ", perPage);
  builder.skip((page - 1) * perPage).take(perPage);
  const records = await builder.getMany();
  return { records, total };
};
