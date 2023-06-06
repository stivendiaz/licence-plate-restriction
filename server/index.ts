import express, { Request, Response } from "express";
import { userRouter } from "./routers/index";

const app = express();
const port = 3000;

app.use("/user", userRouter);

app.get("/", (req: Request, res: Response) => res.send("Hello World"));

app.listen(port, () =>
  console.log(`🚀 Application running on: http://localhost:${port}`)
);
