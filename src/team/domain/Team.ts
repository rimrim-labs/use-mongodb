import User from '../../user/domain/User'

export default class Team {
  public readonly _id: string | null = null

  constructor(
    public readonly name: string,
    public readonly createdAt: string,
    public readonly users: User[]
  ) {}
}
