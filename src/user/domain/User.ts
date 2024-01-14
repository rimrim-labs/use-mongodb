export default class User {
  public readonly _id: string | null = null

  constructor(
    public readonly name: string,
    public readonly age: number,
    public readonly password: string,
    public readonly joinedAt: string
  ) {}
}
