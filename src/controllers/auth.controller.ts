import express from "express";
import { getManager } from "typeorm";
import { User } from "../entity/User";
import bcrypt from "bcrypt";
const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  const em = getManager();
  const { body } = req;

  const user = em.create(User, body);
  console.log("starting to hash");

  user.passwordHash = await bcrypt.hash(body.password, 10);
  console.log(user);

  res.send({ message: "gotcha" });
});

export default authRouter;
