import logger from 'morgan'
import cookieParser from 'cookie-parser'
import express from 'express'
import createError, { HttpError } from 'http-errors'

import indexRouter from './index'
import itemRouter from './item'
import InvalidError from './common/error/InvalidError'

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// custom routes
app.use('/', indexRouter)
app.use('/items', itemRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (
  err: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  let status: number = 500
  let message: string = 'internal server error'

  if (err instanceof InvalidError) {
    status = 400
    message = err.message
  }

  if (err instanceof HttpError) {
    status = err.statusCode
    message = err.message
  }

  res.status(status).json(message)
})

export default app
