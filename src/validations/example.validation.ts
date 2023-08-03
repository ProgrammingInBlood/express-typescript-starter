import { body } from "express-validator";

export const exampleValidation = [
  body("firstName").isString().notEmpty(),
  body("lastName").isString().notEmpty(),
];
