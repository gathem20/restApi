import { Express, Request, Response } from "express";
import { creatHandelr } from "./controller/user.controller";
import validate from "./middleware/validate";
import { CreateUSerSchema } from "./schema/user.schema";
import { createUserSession } from "./controller/session.controller";
import { createsessionScehma } from "./schema/session.schema";
function routes(app: Express) {
  app.get("/getApi", (req: Request, res: Response) => res.sendStatus(200));
  app.post("/postApi", validate(CreateUSerSchema), creatHandelr);
  app.post("/postSession", validate(createsessionScehma), createUserSession);
}

export default routes;
