import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

async function createQuestion(req: Request, res: Response) {
  const { title, description, userId } = req.body;
  const question = await prisma.questions.create({
    data: {
      title: title,
      description: description,
      users: { connect: { id: userId } },
    },
  });
  res.status(201).json(question);
}

async function getAllQuestions(req: Request, res: Response) {
  const questions = await prisma.questions.findMany({
    select: { title: true, id: true, description: true },
  });

  if (questions && questions.length > 0) {
    res.status(200).json(questions);
  } else {
    res.sendStatus(204);
  }
}

async function updateQuestion(req: Request, res: Response) {
  const { question_id } = req.params;
  const { title, description } = req.body;
  await prisma.questions.update({
    where: {
      id: parseInt(question_id),
    },
    data: {
      title: title,
      description: description,
    },
  });
  res.sendStatus(204);
}

async function getQuestionById(req: Request, res: Response) {
  const question_id = parseInt(req.params["id"]);
  const getQuestion = await prisma.questions.findUnique({
    where: { id: question_id },
  });
  if (getQuestion) {
    res.status(200).json(getQuestion);
  } else {
    res.status(404).json("Cannot find question by id");
  }
}

async function deleteQuestionById(req: Request, res: Response) {
  try {
    const question_Id = parseInt(req.params["id"]);
    await prisma.questions.delete({
      where: {
        id: question_Id,
      },
    });
    return res.status(204);
  } catch (err) {
    return res.status(500).json("Cannot delete question by id");
  }
}

const questionController = {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestionById,
};

export { questionController };
