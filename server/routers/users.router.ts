import { Router } from "express";
import { validation } from "../utils";
import { check } from "express-validator";
import { userController } from "../controllers/user.controller";

const userRouter = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The user ID.
 *           example: 1
 *         username:
 *           type: string
 *           description: The user's username.
 *           example: johndoe
 *         email:
 *           type: string
 *           description: The user's email.
 *           example: johndoe@example.com
 *         first_name:
 *           type: string
 *           description: The user's first name.
 *           example: John
 *         last_name:
 *           type: string
 *           description: The user's last name.
 *           example: Doe
 *         password:
 *           type: string
 *           description: The user's password.
 *           example: password123
 *         role_id:
 *           type: integer
 *           description: The ID of the user's role.
 *           example: 1
 */

/**
 * @swagger
 * /user:
 *   post:
 *     tags: [
 *       user
 *     ]
 *     description: Creates a new user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *       description: Created user object
 *       required: true
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       201:
 *         description: User Created
 */
userRouter.route("/").post(
  [
    check("email")
      .isLength({ min: 3 })
      .withMessage("the email must have minimum length of 3")
      .isEmail()
      .withMessage("the email must be in a valid email format")
      .trim(),
    check("username")
      .isLength({ min: 3 })
      .withMessage("the username must have minimum length of 3")
      .trim(),
    check("password")
      .isLength({ min: 8, max: 15 })
      .withMessage("the password should have min and max length between 8-15")
      .matches(/\d/)
      .withMessage("the password should have at least one number")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage("the password should have at least one special character"),
  ],
  validation.validate,
  userController.createUser
);

/**
 * @swagger
 * /user:
 *   get:
 *     description: Retrieves a user object array.
 *     tags:
 *      - user
 *     responses:
 *       200:
 *         description: A valid array of users object.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
userRouter.route("/").get(userController.getAllUsers);

/**
 * @swagger
 * /user/{userId}:
 *   get:
 *     description: Retrieves a single user object based on its id.
 *     tags: [
 *       user
 *     ]
 *     parameters:
 *       - name: userId
 *         in: path
 *         type: integer
 *         description: The ID of the requested user.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       204:
 *         description: No content
 */
userRouter.route("/:user_id(\\d+)").get(userController.getUserById);

/**
 * @swagger
 * /user/{userId}:
 *   put:
 *     description: Updates a user object based on its id.
 *     tags:
 *      - user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to update.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A valid user object.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
userRouter.route("/:user_id(\\d+)").put(
  [
    check("email")
      .isLength({ min: 3 })
      .isEmail()
      .withMessage("the email must have minimum length of 3")
      .trim(),
    check("username")
      .isLength({ min: 3 })
      .withMessage("the username must have minimum length of 3")
      .trim(),
    check("password")
      .isLength({ min: 8, max: 15 })
      .withMessage("the password should have min and max length between 8-15")
      .matches(/\d/)
      .withMessage("the password should have at least one number")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage("the password should have at least one special character"),
  ],
  validation.validate,
  userController.updateUser
);

/**
 * @swagger
 * /user/{userId}:
 *   delete:
 *     description: Deletes a user object based on its id.
 *     tags:
 *      - user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: The user has been deleted.
 */
userRouter.route("/:id").delete(userController.deleteUserById);

export { userRouter };
