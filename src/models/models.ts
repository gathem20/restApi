import mongoose, { mongo } from "mongoose";
import bcrypt, { compare } from "bcrypt";
import config from "config";

export interface Userdoc extends mongoose.Document {
  email: String;
  name: string;
  password: string;
  createdat: Date;
  updated: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
  let user = this as unknown as Userdoc;
  if (!user.isModified("password")) {
    return next;
  }
  const salt = await bcrypt.genSalt(config.get<number>("costfactor"));
  const hash = await bcrypt.hashSync(user.password, salt);
  user.password = hash;
  return next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as Userdoc;
  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

const UserModel = mongoose.model<Userdoc>("api", userSchema);

export default UserModel;
