export default class InvalidError extends Error {
  constructor(public readonly message: string) {
    super(message)
  }
}
