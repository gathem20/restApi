import { TypeOf, object, string } from "zod";

export const CreateUSerSchema = object({
  body: object({
    name: string({
      required_error: " Name is required",
    }),
    password: string({
      required_error: " password is required",
    }).min(8, "password too short "),
    passwordconfirm: string({
      required_error: " password is required",
    }).min(8, "password too short "),

    email: string({
      required_error: " email is required",
    }).email("email is is not valied!"),
  }).refine((data) => data.password === data.passwordconfirm, {
    message: "password do not match ",
    path: ["passwordconfirm"],
  }),
});

export type createUserInput = Omit<
  TypeOf<typeof CreateUSerSchema>,
  "body.passwordconfirm"
>;
function String(arg0: { required_error: string; }) {
  throw new Error("Function not implemented.");
}

