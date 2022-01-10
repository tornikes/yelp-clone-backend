import express from "express";
import { getManager } from "typeorm";
import Restaurant from "../entity/Restaurant";
import { User } from "../entity/User";
import { NotFoundError } from "../errors";
import isAuth from "../middlewares/isAuth";
import parsePageQuery from "../middlewares/parsePageQuery";

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

restaurantRouter.get("/", parsePageQuery, async (req, res) => {
  const em = getManager();
  const page = req.page || 1;
  const pageSize = 9;

  const restaurants = await em
    .getRepository(Restaurant)
    .createQueryBuilder()
    .select([
      "Restaurant.id as id, Restaurant.name as name, Restaurant.imageUrl, Restaurant.description",
      "avg(Review.rating) as rating",
    ])
    .leftJoin("Restaurant.reviews", "Review")
    .groupBy("Restaurant.id")
    .offset((page - 1) * pageSize)
    .limit(pageSize)
    .execute();

  res.send({ restaurants });
});

restaurantRouter.get("/:id", async (req, res) => {
  const em = getManager();
  const { id } = req.params;
  console.log(id);

  const restaurant = await em
    .getRepository(Restaurant)
    .createQueryBuilder()
    .select([
      "Restaurant.id as id, Restaurant.name as name, Restaurant.imageUrl, Restaurant.description, Restaurant.location, Restaurant.createdAt, Restaurant.lastRatedAt",
      "avg(Review.rating) as rating, count(Review.rating) as ratingCount",
    ])
    .where("Restaurant.id = :id", { id })
    .leftJoin("Restaurant.reviews", "Review")
    .groupBy("Restaurant.id")
    .execute();

  if (restaurant.length === 0) {
    throw new NotFoundError();
  }
  res.send({ restaurant: restaurant[0] });
});

restaurantRouter.get("/count", async (req, res) => {
  const em = getManager();
  const count = await em.count(Restaurant);
  res.send({ count });
});

export default restaurantRouter;
