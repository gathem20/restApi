import { Request, Response } from "express";
import { validatePassword } from "../services/user.services";
import { creatsession } from "../services/session.services";
import { signjwt } from "../utils/jwt";
import config from 'config'

export async function createUserSession(req: Request, res: Response) {
  // valid passowrd
  const user = await validatePassword(req.body);
  if (!user) {
    return res.status(401).send("invalid email or password");
  }
  //create a session
  const session = await creatsession(user.id, req.get("user-agent") || "");

  //access token
  const accessToken = signjwt(
    {...user , session: session._id },{expiresIn:config.get('accesstoken')}
  )
  const refershtoken = signjwt(
    { ...user, session: session._id },
    { expiresIn: config.get("accesstoken") }
  );



  return res.send({accessToken , refershtoken})
}
