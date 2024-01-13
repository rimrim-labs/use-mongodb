class Item {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly remain: number,
    public readonly price: number,
    public readonly owner: string,
    public readonly createdAt: string
  ) {}
}

export default Item
