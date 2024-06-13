import mongoose, { mongo } from "mongoose";
import bcrypt, { compare } from "bcrypt";
import config from "config";
import { boolean, ref } from "joi";
import { Userdoc } from "./models";
export interface Scehmadoc extends mongoose.Document {
  user: Userdoc["id"];
  valid: Boolean;
  createdat: Date;
  updated: Date;
  useragent:string
}
const sessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    valid: { type: Boolean, default: true },
    useragent: { type: String },
  },
  {
    timestamps: true,
  }
);

const sessionModel = mongoose.model("session", sessionSchema);

export default sessionModel;
