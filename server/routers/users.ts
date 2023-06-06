import { Router } from "express";

const userRouter = Router();

userRouter.route("/").get((req, res) => {
  res.send("Hello world!");
});

userRouter.route("/:userId").get((req, res) => {
  res.send("Get Single" + req.params.userId);
});

userRouter.route("/").post((req, res) => {
  res.send("Create");
});

userRouter.route("/:userId").put((req, res) => {
  res.send("Update" + req.params.userId);
});

userRouter.route("/:userId").delete((req, res) => {
  res.send("Delete" + req.params.userId);
});

export { userRouter };
