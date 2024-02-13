import { Items, ItemType } from './Item'
import { ClientSession } from 'mongoose'

const save = (item: ItemType, session: ClientSession | null = null) => {
  const created = new Items({
    ...item,
  })
  return created.save({ session })
}

function findOne(id: number, session: ClientSession | null = null) {
  return Items.findOne({ id }).session(session)
}

function findAll(session: ClientSession | null = null) {
  return Items.find({}).session(session)
}

function updateOne(id: number, item: ItemType, session: ClientSession | null = null) {
  return Items.updateOne({ id }, item).session(session)
}

function deleteOne(id: number, session: ClientSession | null = null) {
  return Items.deleteOne({ id }).session(session)
}

export default { save, findOne, findAll, updateOne, deleteOne }
