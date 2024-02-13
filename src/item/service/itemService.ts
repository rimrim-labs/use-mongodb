import itemRepository from '../domain/itemRepository'
import ItemInfo from '../dto/response/ItemInfo'
import * as externalItemService from '../../infrastructure/service/ItemService'
import CreateItem from '../dto/request/CreateItem'
import InvalidError from '../../errors/InvalidError'
import { transactionWrapper } from '../../middleware/transactionWrapper'

const save = async (item: CreateItem) => {
  const res = await itemRepository.save(CreateItem.toEntity(item))
  return res._id
}

const findAllInTransaction = transactionWrapper((session) => {
  return itemRepository.findAll(session)
})

const findDetail = async (id: number) => {
  // 외부 API 에러는 axios 계층에서 처리.
  const { data } = await externalItemService.getItemDetail(id)
  return data
}

const findAll = async () => {
  const items = await itemRepository.findAll()
  return items.map((item) => ItemInfo.fromEntity(item))
}

const findOne = async (id: number) => {
  const item = await itemRepository.findOne(id)
  if (!item) throw new InvalidError(`item ${id} does not exist!`)
  return ItemInfo.fromEntity(item)
}

export default {
  save,
  findOne,
  findDetail,
  findAll,
  findAllInTransaction,
}
