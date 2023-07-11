import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

async function createAnswer(req: Request, res: Response) {
  const questionId = parseInt(req.params["questionId"]);
  const { description, userId } = req.body;
  const answer = await prisma.answers.create({
    data: {
      description: description,
      questions: { connect: { id: questionId } },
      users: { connect: { id: userId } },
    },
  });
  res.status(201).json(answer);
}

async function getAllAnswers(req: Request, res: Response) {
  const questionId = parseInt(req.params["questionId"]);
  const answers = await prisma.answers.findMany({
    select: { id: true, description: true },
    where: { question_id: questionId },
  });

  if (answers && answers.length > 0) {
    res.status(200).json(answers);
  } else {
    res.sendStatus(204);
  }
}

async function updateAnswer(req: Request, res: Response) {
  const { answerId } = req.params;
  const { description } = req.body;
  await prisma.answers.update({
    where: {
      id: parseInt(answerId),
    },
    data: {
      description: description,
    },
  });
  res.sendStatus(204);
}

async function getAnswerById(req: Request, res: Response) {
  const answer_id = parseInt(req.params["answerId"]);
  const getAnswer = await prisma.answers.findUnique({
    where: { id: answer_id },
  });
  if (getAnswer) {
    res.status(200).json(getAnswer);
  } else {
    res.status(404).json("Cannot find answer by id");
  }
}

async function deleteAnswerById(req: Request, res: Response) {
  try {
    const answerId = parseInt(req.params["answer_id"]);
    await prisma.answers.delete({
      where: {
        id: answerId,
      },
    });
    return res.status(204);
  } catch (err) {
    return res.status(500).json("Cannot delete answer by id");
  }
}

const answerController = {
  createAnswer,
  getAllAnswers,
  getAnswerById,
  updateAnswer,
  deleteAnswerById,
};

export { answerController };
