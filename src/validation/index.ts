import type { NextFunction } from 'express'
import { ObjectSchema } from 'yup'
import createError from 'http-errors'

export const validate = async <T>(data: T, schema: ObjectSchema<object>, next: NextFunction) => {
  try {
    await schema.validate(data)
    return next()
  } catch (err) {
    next(createError(400, 'Invalid Request'))
  }
}
