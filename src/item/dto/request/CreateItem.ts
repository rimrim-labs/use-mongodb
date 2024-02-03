import { ItemType } from '../../domain/Item'

class CreateItem {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly remain: number,
    public readonly price: number,
    public readonly owner: string,
    public readonly createdAt: Date
  ) {}

  static toEntity(item: CreateItem): ItemType {
    return {
      id: item.id,
      name: item.name,
      remain: item.remain,
      price: item.price,
      owner: item.owner,
      createdAt: item.createdAt,
    }
  }
}

export default CreateItem
