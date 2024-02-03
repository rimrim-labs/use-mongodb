import type { NextFunction, Request, Response } from 'express'
import { AnyObject, ObjectSchema } from 'yup'
import createError from 'http-errors'

interface ValidationSchema<P extends AnyObject, Q extends AnyObject, B extends AnyObject> {
  body?: ObjectSchema<B>
  query?: ObjectSchema<Q>
  params?: ObjectSchema<P>
}

export const validate =
  <P extends AnyObject, Q extends AnyObject, B extends AnyObject>(
    schema: ValidationSchema<P, Q, B>
  ) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const keys = Object.keys(schema) as Array<keyof ValidationSchema<P, Q, B>>

      for (const key of keys) {
        if (schema[key]) await schema[key]!.validate(req[key])
      }
      return next()
    } catch (err) {
      next(createError(400, 'Invalid Request'))
    }
  }
