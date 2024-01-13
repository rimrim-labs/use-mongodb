import { db } from '../db/mongo'
import { Collection } from 'mongodb'
import Item from './domain/Item'

const save = (item: Item) => {
  const items: Collection<Item> = db.collection('items')
  return items.insertOne(item)
}

async function findOne(id: number) {
  const items: Collection<Item> = db.collection('items')
  return await items.findOne({ id })
}

function findAll() {
  const items: Collection<Item> = db.collection('items')
  const res = items.find({})
  return res.toArray()
}

function updateOne(id: number, item: Item) {
  const items: Collection<Item> = db.collection('items')
  return items.updateOne({ id }, item)
}

function deleteOne(id: number) {
  const items: Collection<Item> = db.collection('items')
  return items.deleteOne({ id })
}

export default { save, findOne, findAll, updateOne, deleteOne }
