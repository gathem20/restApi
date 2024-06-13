import sessionModel from "../models/session";

export async function creatsession(userId: string, useragent: string) {
  const session = await sessionModel.create({ user: userId, useragent });
  return session.toJSON()
}
