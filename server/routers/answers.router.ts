import { Router } from "express";
import { validation } from "../utils";
import { check } from "express-validator";
import { answerController } from "../controllers/answer.controller";

const answersRouter = Router({ mergeParams: true });

/**
 * @swagger
 * components:
 *   schemas:
 *     Answer:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The answer ID.
 *           example: 1
 *         description:
 *           type: string
 *           description: The answer's description.
 *           example: John
 *     AnswerNoId:
 *       type: object
 *       properties:
 *         description:
 *           type: string
 *           description: The answer's description.
 *           example: John
 */

/**
 * @swagger
 * /questions/{questionId}/answers:
 *   post:
 *     tags: [
 *       answer
 *     ]
 *     description: Creates a new answer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AnswerNoId'
 *       description: Created answer object
 *       required: true
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       201:
 *         description: Answer Created
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         description: Numeric ID of the answer to delete.
 *         schema:
 *           type: integer
 */
answersRouter
  .route("/")
  .post(
    [
      check("description")
        .isLength({ min: 3 })
        .withMessage("the description must have minimum length of 3")
        .trim(),
    ],
    validation.validate,
    answerController.createAnswer
  );

/**
 * @swagger
 * /questions/{questionId}/answers:
 *   get:
 *     description: Retrieves a answer object array.
 *     tags:
 *      - answer
 *     responses:
 *       200:
 *         description: A valid array of answers object.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Answer'
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         description: Numeric ID of the answer to delete.
 *         schema:
 *           type: integer
 *       - in: path
 *         name: answerId
 *         required: true
 *         description: Numeric ID of the answer to delete.
 *         schema:
 *           type: integer

 */
answersRouter.route("/").get(answerController.getAllAnswers);

/**
 * @swagger
 * /questions/{questionId}/answers/{answerId}:
 *   get:
 *     description: Retrieves a single answer object based on its id.
 *     tags: [
 *       answer
 *     ]
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         description: Numeric ID of the answer to delete.
 *         schema:
 *           type: integer
 *       - in: path
 *         name: answerId
 *         required: true
 *         description: Numeric ID of the answer to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Answer'
 *       204:
 *         description: No content
 */
answersRouter.route("/:answerId(\\d+)").get(answerController.getAnswerById);

/**
 * @swagger
 * /questions/{questionId}/answers/{answerId}:
 *   put:
 *     description: Updates a answer object based on its id.
 *     tags:
 *      - answer
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         description: Numeric ID of the answer to delete.
 *         schema:
 *           type: integer
 *       - in: path
 *         name: answerId
 *         required: true
 *         description: Numeric ID of the answer to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A valid answer object.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AnswerNoId'
 */
answersRouter
  .route("/:answerId(\\d+)")
  .put(
    [
      check("description")
        .isLength({ min: 3 })
        .withMessage("the description must have minimum length of 3")
        .trim(),
    ],
    validation.validate,
    answerController.updateAnswer
  );

/**
 * @swagger
 * /questions/{questionId}/answers/{answerId}:
 *   delete:
 *     description: Deletes a answer object based on its id.
 *     tags:
 *      - answer
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         description: Numeric ID of the answer to delete.
 *         schema:
 *           type: integer
 *       - in: path
 *         name: answerId
 *         required: true
 *         description: Numeric ID of the answer to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: The answer has been deleted.
 */
answersRouter
  .route("/:answerId(\\d+)")
  .delete(answerController.deleteAnswerById);

answersRouter.use(
  "/:answerId/answers",
  require("./answers.router").answersRouter
);

export { answersRouter };
