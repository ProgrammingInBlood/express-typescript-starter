import { NextFunction, Request, Response } from "express";
import { HttpException } from "@exceptions/httpException";
import { logger } from "@utils/logger";

export const ErrorMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const status: number = error.status || 500;
    const message: string = error.message || "Something went wrong";
    const errors: any = error.errors || null;

    logger.error(
      `[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}` +
        (errors ? `, Errors:: ${JSON.stringify(errors)}` : "")
    );
    res.status(status).json({ message, errors });
  } catch (error) {
    next(error);
  }
};
