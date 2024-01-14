import { Collection, WithoutId } from 'mongodb'
import Item from '../../src/item/domain/Item'
import { connectDB, db } from '../../src/db/mongo'

let items: Collection<Item>

beforeAll(async () => {
  await connectDB()
  items = db.collection('items')
})

describe('insertOnt: document 1건 저장', () => {
  test('1건의 document를 저장한다.', async () => {
    const item = new Item(12, 'test', 200, 200, 'you', new Date().toISOString())
    expect(item._id).toBeUndefined()

    const inserted = await items.insertOne(item)
    expect(item._id).toBe(inserted.insertedId)
  })
})

describe('deleteOne: document 1건 삭제', () => {
  test('1건의 document를 제거한다.', async () => {
    const target = await items.findOne()
    const res = await items.deleteOne({ _id: target!._id })

    expect(res.deletedCount).toBe(1)
  })
})

describe('update: document 필드를 갱신한다.', () => {
  test('1건의 document를 갱신한다.', async () => {
    const target = await items.findOne()
    const updateDocument = {
      $set: {
        price: 1_000_000,
      },
    }
    const res = await items.updateOne({ _id: target!._id }, updateDocument)

    expect(res.matchedCount).toBe(1)
    expect(res.modifiedCount).toBe(1)
  })

  test('1건의 document 필드를 모두 갱신한다.', async () => {
    const target = await items.findOne()
    const updated: WithoutId<Item> = {
      id: target!.id + 1_000,
      name: target!.name ?? 'test',
      remain: target!.remain - 1,
      owner: 'new_owner',
      price: target!.price,
      createdAt: target!.createdAt,
    }
    const res = await items.replaceOne({ _id: target!._id }, updated)

    expect(res.matchedCount).toBe(1)
    expect(res.modifiedCount).toBe(1)
  })
})
