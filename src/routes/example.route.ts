import { Router } from "express";
import * as controller from "../controllers/example.controller";
import { exampleValidation } from "@/validations/example.validation";
import { ValidationMiddleware } from "@/middlewares/validation.middleware";

const path = "/";
const router = Router();

router.get(`${path}`, controller.exampleController);
router.post(
  `${path}`,
  ValidationMiddleware(exampleValidation),
  controller.examplePostController
);

export default { path, router };
