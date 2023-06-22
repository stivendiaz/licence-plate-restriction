import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import bcrypt from "bcrypt";

async function createUser(req: Request, res: Response) {
  const { email, username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email: email,
      username: username,
      password: hashedPassword,
    },
  });
  res.status(201).json(user);
}

async function getAllUsers(req: Request, res: Response) {
  const users = await prisma.user.findMany({
    select: { email: true, id: true },
  });
  if (users && users.length > 0) {
    res.status(200).json(users);
  } else {
    res.sendStatus(204);
  }
}

async function updateUser(req: Request, res: Response) {
  const { user_id } = req.params;
  const { email, username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.user.update({
    where: {
      id: parseInt(user_id),
    },
    data: {
      email: email,
      username: username,
      password: hashedPassword,
    },
  });
  res.sendStatus(204);
}

async function getUserById(req: Request, res: Response) {
  const user_id = parseInt(req.params["id"]);
  const getUser = await prisma.user.findUnique({
    where: { id: user_id },
  });
  if (getUser) {
    res.status(200).json(getUser);
  } else {
    res.status(404).json("Cannot find user by id");
  }
}

async function deleteUserById(req: Request, res: Response) {
  try {
    const user_Id = parseInt(req.params["id"]);
    await prisma.user.delete({
      where: {
        id: user_Id,
      },
    });
    return res.status(204);
  } catch (err) {
    return res.status(500).json("Cannot delete user by id");
  }
}

const userController = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUserById,
};

export { userController };
