import userService from "../services/user.service.js";
import { handleHttpError } from "../utils/controllerErrorHandler.js"
import type { Request, Response } from "express";
import { getErrorStatusCode } from "../utils/errrors.js";
import clientService from "../services/client.service.js";
import { generateToken } from "../utils/jwt.js";

export default {
  async getClientUsers(req:Request, res:Response) {
    try {
      const result = await userService.getClientUsers();

      if(!result.success) {
        const statusCode = getErrorStatusCode(result.errorType)
        return res.status(statusCode).json({
          success: false,
          message: result.error
        })
      }

      return res.status(200).json({
        success: true,
        data: result.value
      })
    } catch (error) {
      handleHttpError(res, error)
    }
  },
  async getClientUserById(req:Request, res:Response) {
    try {
      const userId = Number(req.params.id)
      const result = await userService.getClientUserById(userId)

      if(!result.success) {
        const statusCode = getErrorStatusCode(result.errorType)
        return res.status(statusCode).json({
          success: false,
          message: result.error
        })
      }

      return res.status(200).json({
        success: true,
        data: result.value
      })
    } catch (error) {
      handleHttpError(res, error)
    }
  },
  async createClientUser(req:Request, res:Response) {
    try {
      const data = req.body
      const createUserResult = await userService.createUser(data)

      if(!createUserResult.success) {
        const statusCode = getErrorStatusCode(createUserResult.errorType)
        return res.status(statusCode).json({
          success: false,
          message: createUserResult.error
        })
      }

      const createClientResult = await clientService.createClient({...data, userId: createUserResult.value.id })
      
      if(!createClientResult.success) {
        const statusCode = getErrorStatusCode(createClientResult.errorType)
        return res.status(statusCode).json({
          success: false,
          message: createClientResult.error
        })
      }

      return res.status(201).json({
        success: createUserResult.success,
        message: 'User created successfully',
        data: createUserResult.value
      })
    } catch (error) {
      handleHttpError(res, error)
    }
  },
  async loginUser(req:Request, res:Response) {
    try {
      const { email, password } = req.body
      const getUserResult = await userService.loginUser(email, password)

      if(!getUserResult.success) {
        const statusCode = getErrorStatusCode(getUserResult.errorType)
        return res.status(statusCode).json({
          success: false,
          message: getUserResult.error
        })
      }

      const getClientResult = await clientService.getClientByUserId(getUserResult.value.id)
      
      if(!getClientResult.success) {
        const statusCode = getErrorStatusCode(getClientResult.errorType)
        return res.status(statusCode).json({
          success: false,
          message: getClientResult.error
        })
      }
      const token = generateToken({ userId: getUserResult.value.id, role: getUserResult.value.role, clientId: getClientResult.value.id });

      

      return res.status(200).json({
        success: true,
        message: 'User logged in successfully',
        data: { token, }
      })
    } catch (error) {
      handleHttpError(res, error) 
    }
  },
  async updateClientUser(req:Request, res:Response) {
    try {
      const userId = Number(req.params.id)
      const result = await userService.updateClientUser(userId, req.body)

      if(!result.success) {
        const statusCode = getErrorStatusCode(result.errorType)
        return res.status(statusCode).json({
          success: false,
          message: result.error
        })
      }

      return res.status(200).json({
        success: true,
        message: 'Client user updated successfully',
        data: result.value
      })
    } catch (error) {
      handleHttpError(res, error)
    }
  },
  async deleteClientUser(req:Request, res:Response) {
    try {
      const userId = Number(req.params.id)
      const result = await userService.deleteClientUser(userId)

      if(!result.success) {
        const statusCode = getErrorStatusCode(result.errorType)
        return res.status(statusCode).json({
          success: false,
          message: result.error
        })
      }

      return res.status(200).json({
        success: true,
        message: 'Client user deleted successfully',
        data: result.value
      })
    } catch (error) {
      handleHttpError(res, error)
    }
  }
}
