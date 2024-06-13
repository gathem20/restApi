import {object , string } from 'zod'





 
export const createsessionScehma = object({
  body: object({
    email: string({
      required_error: "email is reqired",
    }),
    password: string({
      required_error: "password is reqired",
    }),
  }),
});