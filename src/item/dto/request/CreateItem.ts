import Item from '../../domain/Item'

class CreateItem {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly remain: number,
    public readonly price: number,
    public readonly owner: string,
    public readonly createdAt: string
  ) {}

  static toEntity(item: CreateItem) {
    return new Item(item.id, item.name, item.remain, item.price, item.owner, item.createdAt)
  }
}

export default CreateItem
