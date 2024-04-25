import "dotenv/config";
import express from "express";
import "./database/connectdb.js";
import authrouter from "./routes/auth.route.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use("/api/v1", authrouter);

app.listen(PORT, () => console.log("http://localhost:" + PORT));
