import { Collection, WithoutId } from 'mongodb'
import Item from '../../src/item/domain/Item'
import { connectDB, db } from '../../src/db/mongo'
import Team from '../../src/team/domain/Team'
import User from '../../src/user/domain/User'

let items: Collection<Item>
let teams: Collection<Team>

beforeAll(async () => {
  await connectDB()

  items = db.collection('items')
  teams = db.collection('teams')
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

describe('updateOne, replaceOne: document 필드를 갱신한다.', () => {
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

  test('document 필드 배열을 갱신한다.', async () => {
    // given
    const user = new User('hi', 30, 'test', new Date().toISOString())
    const team = new Team('test team', new Date().toISOString(), [user])
    await teams.insertOne(team)

    // when
    const query = { _id: team._id, 'users.name': { $eq: 'hi' } }
    const updateDocument = { $set: { 'users.$.age': 22 } }
    const res = await teams.updateOne(query, updateDocument)

    // then
    expect(res.matchedCount).toBe(1)
    expect(res.modifiedCount).toBe(1)

    const updated = await teams.findOne({ _id: team._id })
    expect(updated?.users[0].age).toBe(22)
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
