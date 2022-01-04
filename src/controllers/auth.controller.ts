import express from "express";
import { getManager } from "typeorm";
import { User } from "../entity/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

authRouter.post("/login", async (req, res) => {
  const em = getManager();

  const user = await em.findOne(User, { email: req.body.email });

  if (!user) {
    return res.status(404).send({ message: "unknown user" });
  }

  const isMatch = await bcrypt.compare(req.body.password, user.passwordHash);
  if (!isMatch) {
    return res.send({ message: "Invalid credentials" });
  }

  const userData = { id: user.id, name: user.userName };

  const token = jwt.sign(userData, "SUPER_SECRET", {
    expiresIn: "7d",
  });

  res.send({ token });
});

export default authRouter;
