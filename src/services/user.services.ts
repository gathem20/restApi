import UserModel, { Userdoc } from "../models/models";
import { Document } from "mongoose";
import { omit } from "lodash";

export async function createUser(
  input: Document<
    Omit<Userdoc, "createdat" | "updated" | "comparePassword">
  >
) {
  try {
    const user = await UserModel.create(input);
    return omit(user.toJSON(), "password");
  } catch (error: any) {
    throw new Error(error);
  }
}
export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await UserModel.findOne({ email });
  if (!user) {
    return false;
  }
  const isvalid = await user.comparePassword(password);
  if (!isvalid) return false;
  return omit(user.toJSON(), "password");
}
