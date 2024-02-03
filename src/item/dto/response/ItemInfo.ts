import { ItemType } from '../../domain/Item'

class ItemInfo {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly price: number,
    public readonly createdAt: number
  ) {}

  static fromEntity(item: ItemType) {
    return new ItemInfo(item.id, item.name, item.price, item.createdAt.valueOf())
  }
}

export default ItemInfo
