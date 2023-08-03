import { examplePostService, exampleService } from "@/services/example.service";
import { NextFunction, Request, Response } from "express";

export const exampleController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).send(exampleService());
  } catch (error) {
    next(error);
  }
};

export const examplePostController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).send(examplePostService(req.body));
  } catch (error) {
    next(error);
  }
};
