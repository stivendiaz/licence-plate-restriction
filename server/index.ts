import express, { Request, Response, json, urlencoded } from "express";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { userRouter } from "./routers/index";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "TripBud App",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local development server",
    },
  ],
};

const openapiSpecification = swaggerJSDoc({
  swaggerDefinition,
  apis: ["./routers/*.ts"],
});

const app = express();
const port = 3000;

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(openapiSpecification));

app.use("/swagger.json", (req: Request, res: Response) =>
  res.json(openapiSpecification).status(200)
);

app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/user", userRouter);

app.get("/", (req: Request, res: Response) => res.send("Hello World"));

app.listen(port, () =>
  console.log(`🚀 Application running on: http://localhost:${port}`)
);
