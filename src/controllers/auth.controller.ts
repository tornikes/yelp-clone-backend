import express from "express";
import { getManager } from "typeorm";
import { User } from "../entity/User";
import bcrypt from "bcrypt";
const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  const em = getManager();
  const { body } = req;

  const user = em.create(User, body);

  const { passwordHash, ...copiedUser } = user;

  user.passwordHash = await bcrypt.hash(body.password, 10);

  await em.save(user);

  res.status(201).send({ user: copiedUser });
});

export default authRouter;
