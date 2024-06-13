import mongoose from "mongoose";
import config from "config";
async function connect() {
  const dbUrl = config.get<string>("dbUrl");
  try {
    await mongoose.connect(dbUrl);
    console.log("welcome to DB!");
  } catch (error) {
    console.error("sorry for disconnectd");
    process.exit(1);
  }
}

export default connect;
