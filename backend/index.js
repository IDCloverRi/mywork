import express from "express";
import cors from "cors";
import mysql from "mysql2";

import VxspRouter from "./routes/VxspRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(VxspRouter);

app.listen("5000", () => console.log("Server is running..."));
