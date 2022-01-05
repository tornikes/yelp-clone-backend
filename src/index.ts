import "reflect-metadata";
import "express-async-errors";
import { createConnection } from "typeorm";
import express from "express";
import cors from "cors";
import authRouter from "./controllers/auth.controller";
import errorHandler from "./middlewares/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());

async function start() {
  const conn = await createConnection();

  await conn.runMigrations();

  const PORT = process.env.PORT || 5000;

  app.get("/", (req, res) => {
    res.send({ message: "Hello, World" });
  });

  app.use("/api/auth", authRouter);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server launched at port ${PORT}`);
  });
}

start();
