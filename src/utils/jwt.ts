import Jwt from "jsonwebtoken";
import config from "config";
import { valid } from "joi";
import { decode } from "punycode";

const privetekey = config.get<string>("privatekey");
const publickey = config.get<string>("publickey");
export function signjwt(object: object, options?: Jwt.SignOptions | undefined) {
  return Jwt.sign(object, privetekey, {
    ...(options && options),
    algorithm: "RS256",
  });
}

export function verifyjwt(token: string) {
  try {
    const decoded = Jwt.verify(token, publickey);
    return {
      valid: true,
      expired: false,
      decode,
    };
  } catch (error: any) {
    return {
      valid: false,
      expired: error.message === "jwt expired",
      decode:null
    };
  }
}
