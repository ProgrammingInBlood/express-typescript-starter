import { NextFunction, Request, Response } from "express";
import { HttpException } from "@exceptions/httpException";
import { validationResult, ValidationChain } from "express-validator";

export const ValidationMiddleware = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (const validation of validations) {
      const result = (await validation.run(req)) as any;
      if (result.errors.length) break;
    }
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    next(new HttpException(400, "Validation error", errors.array()));
  };
};
