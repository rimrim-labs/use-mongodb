import type { RequestHandler } from 'express'

type AsyncRequestHandler = (...args: Parameters<RequestHandler>) => Promise<void>

export const wrap = (asyncFn: AsyncRequestHandler): AsyncRequestHandler => {
  return async (req, res, next) => {
    asyncFn(req, res, next).catch((err) => next(err))
  }
}
