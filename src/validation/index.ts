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
      if (schema.body) await schema.body.validate(req.body)
      if (schema.query) await schema.query.validate(req.query)
      if (schema.params) await schema.params.validate(req.params)
      return next()
    } catch (err) {
      next(createError(400, 'Invalid Request'))
    }
  }
