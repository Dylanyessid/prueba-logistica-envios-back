import userService from "../services/user.service.js";
import { handleHttpError } from "../utils/controllerErrorHandler.js"
import type { Request, Response } from "express";
import { getErrorStatusCode } from "../utils/errrors.js";

export default {
  async createUser(req:Request, res:Response) {
    try {
      const data = req.body
      const result = await userService.createUser(data)

      if(!result.success) {
        const statusCode = getErrorStatusCode(result.errorType)
        return res.status(statusCode).json({
          success: false,
          message: result.error
        })
      }

      return res.status(201).json({
        success: result.success,
        message: 'User created successfully',
        data: result.value
      })
    } catch (error) {
      handleHttpError(res, error)
    }
  },
  async loginUser(req:Request, res:Response) {
    try {
      const { email, password } = req.body
      const result = await userService.loginUser(email, password)

      if(!result.success) {
        const statusCode = getErrorStatusCode(result.errorType)
        return res.status(statusCode).json({
          success: false,
          message: result.error
        })
      }

      return res.status(200).json({
        success: result.success,
        message: 'User logged in successfully',
        data: { token: result.value.token }
      })
    } catch (error) {
      handleHttpError(res, error) 
    }
  }
}
