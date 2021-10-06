import { Request, Response } from "express";
import { Company } from "src/entity/Company";

export interface MyContext {
  req: Request;
  res: Response;
  payload?: { userId: number; company: Company };
}
