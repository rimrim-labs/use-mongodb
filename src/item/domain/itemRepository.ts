import { Items, ItemType } from './Item'

const save = (item: ItemType) => {
  const created = new Items({
    ...item,
  })
  return created.save()
}

function findOne(id: number) {
  return Items.findOne({ id })
}

function findAll() {
  return Items.find({})
}

function updateOne(id: number, item: ItemType) {
  return Items.updateOne({ id }, item)
}

function deleteOne(id: number) {
  return Items.deleteOne({ id })
}

export default { save, findOne, findAll, updateOne, deleteOne }
