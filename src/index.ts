import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import authRouter from "./controllers/auth.controller";

const app = express();

app.use(express.json());

async function start() {
  const conn = await createConnection();

  await conn.runMigrations();

  const PORT = process.env.PORT || 5000;

  app.get("/", (req, res) => {
    res.send({ message: "Hello, World" });
  });

  app.use("/api/auth", authRouter);

  app.listen(PORT, () => {
    console.log(`Server launched at port ${PORT}`);
  });
}

start();
