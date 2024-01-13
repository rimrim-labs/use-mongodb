import Item from '../../domain/Item'

class ItemInfo {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly price: number,
    public readonly createdAt: string
  ) {}

  static fromEntity(item: Item) {
    return new ItemInfo(item.id, item.name, item.price, item.createdAt)
  }
}

export default ItemInfo
