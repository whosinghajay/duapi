import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import  userRoute  from "./routes/user";
import mongoose from "mongoose";

const app = express();

dotenv.config();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/", userRoute);

mongoose
  .connect(process.env.MONGO_URI as string, { dbName: "api" })
  .then((c) => console.log(`DB is connect to ${c.connection.host}`))
  .catch((error) => console.log("DB Connection Error", error));

app.listen(3000, () => {
  console.log("Port is listening at 3000");
});
