import Express from "express";
import config from "config";
import connect from "./utils/connect";
// import logger from "./utils/log";
import routes from "./routes";
const app = Express();
const port = config.get<number>("port");
app.use(Express.json())
app.listen(port, async () => {
  console.log(`server is connected at http://localhost:${port}`);
  await connect();
  routes(app);
});
