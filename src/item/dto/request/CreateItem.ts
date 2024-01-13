import Item from '../../domain/Item'

class CreateItem {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly remain: number,
    public readonly price: number,
    public readonly owner: string,
    public readonly createdAt: Date
  ) {}

  toEntity() {
    return new Item(this.id, this.name, this.remain, this.price, this.owner, this.createdAt)
  }
}

export default CreateItem
