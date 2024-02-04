import BaseError from './BaseError'

export default class InvalidError extends BaseError {
  constructor(public readonly message: string) {
    super(message, 400)
  }
}
