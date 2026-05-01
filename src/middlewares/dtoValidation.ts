import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import type { NextFunction, Request, RequestHandler, Response } from "express";

type DtoClass<T extends object> = new () => T;

export function validationMiddleware<T extends object>(dtoClass: DtoClass<T>): RequestHandler {
  return async (req:Request, res:Response, next:NextFunction) => {
    const output = plainToInstance(dtoClass, req.body);

    const errors: ValidationError[] = await validate(output, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
      const message = errors
        .flatMap((error: ValidationError) => Object.values(error.constraints || {}))
        .join(', ');
      
      return res.status(400).json({ success: false, message });
    }

    req.body = output as Request["body"];
    next();
  };
}
