import BaseError from './BaseError'

export default class ServerError extends BaseError {
  constructor(public readonly message: string) {
    super(message, 500)
  }
}
