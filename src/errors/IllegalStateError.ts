import BaseError from './BaseError'

export default class IllegalStateError extends BaseError {
  constructor(public readonly message: string) {
    super(message, 400)
  }
}
