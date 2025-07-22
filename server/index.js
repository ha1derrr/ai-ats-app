import dotenv from "dotenv";
dotenv.config();
import { connect } from "mongoose";
const PORT = process.env.PORT ?? 3000;
import { app } from "./app.js";

connect(process.env.MONGO_URL)
  .then(() => console.log("Database Connected Successfully"))
  .then(() =>
    app.listen(process.env.PORT, (req, res) =>
      console.log(`Server running at http://localhost:${PORT}`)
    )
  )
  .catch((error) => {
    console.error(`Error Connecting Database: ${error}`);
    process.exit(1);
  });

app.get("/", (req, res) => res.send("Home Page"));
