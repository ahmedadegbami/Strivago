import express from "express";
import createError from "http-errors";
import userModel from "./model.js";

const userRouter = express.Router();

userRouter.post("/", async (req, res, next) => {
  try {
    const newUser = new userModel(req.body);
    const { _id } = await newUser.save();
    res.status(201).send({ _id });
  } catch (error) {
    next(error);
  }
});

userRouter.get(
  "/",

  async (req, res, next) => {
    try {
      const users = await userModel.find();
      res.send(users);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

userRouter.get(
  "/:userId",

  async (req, res, next) => {
    try {
      const user = await userModel.findById(req.params.userId);
      if (user) {
        res.send(user);
      } else {
        next(createError(404, `User with id ${req.params.userId} not found!`));
      }
    } catch (error) {
      next(error);
    }
  }
);

userRouter.put(
  "/:userId",

  async (req, res, next) => {
    try {
      const updatedUser = await userModel.findByIdAndUpdate(
        req.params.userId,
        req.body,
        { new: true, runValidators: true }
      );
      if (updatedUser) {
        res.send(updatedUser);
      } else {
        next(createError(404, `User with id ${req.params.userId} not found!`));
      }
    } catch (error) {
      next(error);
    }
  }
);

userRouter.delete(
  "/:userId",

  async (req, res, next) => {
    try {
      const deletedUser = await userModel.findByIdAndDelete(req.params.userId);
      if (deletedUser) {
        res.send({ message: "User deleted successfully!" });
      } else {
        next(createError(404, `User with id ${req.params.userId} not found!`));
      }
    } catch (error) {
      next(error);
    }
  }
);

export default userRouter;