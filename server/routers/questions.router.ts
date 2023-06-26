import { Router } from "express";
import { validation } from "../utils";
import { check } from "express-validator";
import { questionController } from "../controllers/question.controller";

const questionsRouter = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Question:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The question ID.
 *           example: 1
 *         title:
 *           type: string
 *           description: The question's title.
 *           example: johndoe@example.com
 *         description:
 *           type: string
 *           description: The question's description.
 *           example: John
 */

/**
 * @swagger
 * /question:
 *   post:
 *     tags: [
 *       question
 *     ]
 *     description: Creates a new question
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Question'
 *       description: Created question object
 *       required: true
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       201:
 *         description: Question Created
 */
questionsRouter
  .route("/")
  .post(
    [
      check("title")
        .isLength({ min: 3 })
        .withMessage("the title must have minimum length of 3")
        .trim(),
      check("description")
        .isLength({ min: 3 })
        .withMessage("the description must have minimum length of 3")
        .trim(),
    ],
    validation.validate,
    questionController.createQuestion
  );

/**
 * @swagger
 * /question:
 *   get:
 *     description: Retrieves a question object array.
 *     tags:
 *      - question
 *     responses:
 *       200:
 *         description: A valid array of questions object.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Question'
 */
questionsRouter.route("/").get(questionController.getAllQuestions);

/**
 * @swagger
 * /question/{questionId}:
 *   get:
 *     description: Retrieves a single question object based on its id.
 *     tags: [
 *       question
 *     ]
 *     parameters:
 *       - name: questionId
 *         in: path
 *         type: integer
 *         description: The ID of the requested question.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Question'
 *       204:
 *         description: No content
 */
questionsRouter
  .route("/:question_id(\\d+)")
  .get(questionController.getQuestionById);

/**
 * @swagger
 * /question/{questionId}:
 *   put:
 *     description: Updates a question object based on its id.
 *     tags:
 *      - question
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the question to update.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A valid question object.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Question'
 */
questionsRouter
  .route("/:question_id(\\d+)")
  .put(
    [
      check("title")
        .isLength({ min: 3 })
        .withMessage("the title must have minimum length of 3")
        .trim(),
      check("description")
        .isLength({ min: 3 })
        .withMessage("the description must have minimum length of 3")
        .trim(),
    ],
    validation.validate,
    questionController.updateQuestion
  );

/**
 * @swagger
 * /question/{questionId}:
 *   delete:
 *     description: Deletes a question object based on its id.
 *     tags:
 *      - question
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the question to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: The question has been deleted.
 */
questionsRouter.route("/:id").delete(questionController.deleteQuestionById);

export { questionsRouter };
