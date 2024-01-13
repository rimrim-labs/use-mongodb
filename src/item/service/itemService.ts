import itemRepository from '../domain/itemRepository'
import ItemInfo from '../dto/response/ItemInfo'
import CreateItem from '../dto/request/CreateItem'

const save = async (item: CreateItem) => {
  const res = await itemRepository.save(CreateItem.toEntity(item))
  return res.insertedId
}

const findAll = async () => {
  const items = await itemRepository.findAll()
  return items.map((item) => ItemInfo.fromEntity(item))
}

const findOne = async (id: number) => {
  const item = await itemRepository.findOne(id)
  if (!item) throw new Error(`item ${id} does not exist!`)
  return ItemInfo.fromEntity(item)
}

export default {
  save,
  findOne,
  findAll,
}
