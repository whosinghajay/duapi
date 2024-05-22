import express from "express";
import { login, signup } from "../controllers/user";

const app = express.Router();

app.post("/signup", signup);
app.post("/login", login);

export default app;
