import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../utils/prisma";

async function authenticate(req: Request, res: Response) {
  const { email, password } = req.body;

  const users = await prisma.user.findMany({
    where: {
      email: email,
    },
  });

  const user = users && users.length > 0 && users[0];

  if (user) {
    const passwordCorrect = await bcrypt.compare(password, user.password);

    if (passwordCorrect) {
      return res.status(200).json({
        accessToken: jwt.sign({ sub: user.id }, "accessJWTSecret", {
          expiresIn: 1200,
        }),

        refreshToken: jwt.sign({ sub: user.id }, "refreshJWTSecret", {
          expiresIn: 1209600,
        }),
      });
    }
  }

  return res.sendStatus(401);
}

async function refresh(req: Request, res: Response) {
  const userId = res.locals.user as number;

  var user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (user) {
    return res.status(200).json({
      accessToken: jwt.sign({ sub: user.id }, "accessJWTSecret", {
        expiresIn: 1200,
      }),

      refreshToken: jwt.sign({ sub: user.id }, "refreshJWTSecret", {
        expiresIn: 1209600,
      }),
    });
  }

  return res.sendStatus(401);
}

const authController = {
  authenticate,
  refresh,
};

export { authController };
