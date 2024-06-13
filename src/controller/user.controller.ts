import { createUserInput } from "../schema/user.schema";
import { createUser } from "../services/user.services";
import { Request, Response } from "express";
import { omit } from "lodash";
export async function creatHandelr(
  req: Request<createUserInput["body"]>,
  res: Response
) {
  try {
    const user = await createUser(req.body);
    console.log(user)
    return res.send(omit(user.toJSON(), "password"));
  } catch (error: any) {
    console.log(error);
    return res.status(408).send(error);
  }
}
