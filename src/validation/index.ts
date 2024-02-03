import type { NextFunction, Request, Response } from 'express'
import { ObjectSchema } from 'yup'
import createError from 'http-errors'

export const validate =
  (schema: ObjectSchema<object>) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      })
      return next()
    } catch (err) {
      next(createError(400, 'Invalid Request'))
    }
  }
