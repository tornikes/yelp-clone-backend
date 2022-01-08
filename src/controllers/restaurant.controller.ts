import express from "express";
import { getManager } from "typeorm";
import Restaurant from "../entity/Restaurant";
import { User } from "../entity/User";
import { NotFoundError } from "../errors";
import isAuth from "../middlewares/isAuth";

const restaurantRouter = express.Router();

restaurantRouter.post("/", isAuth, async (req, res) => {
  const em = getManager();
  const userId = req.user!.id;
  const submittedBy = await em.findOne(User, userId);
  if (!submittedBy) {
    throw new NotFoundError();
  }
  const restaurant = em.create(Restaurant, req.body);
  restaurant.user = submittedBy;
  await em.save(restaurant);

  const { user, ...rest } = restaurant;

  res.send({ restaurant: rest });
});

restaurantRouter.get("/", async (req, res) => {
  const em = getManager();
  const restaurants = await em.find(Restaurant, {});
  res.send({ restaurants });
});

export default restaurantRouter;
