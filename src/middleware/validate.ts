import bodyParser from "body-parser";
import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";
const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        parmas: req.params,
      });
      next();
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  };
export default validate;
