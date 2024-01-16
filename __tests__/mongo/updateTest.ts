import { connect } from '../../src/mongo'
import { Items, ItemType } from '../../src/item/domain/Item'
import User from '../../src/user/domain/User'
import { Teams, TeamType } from '../../src/team/domain/Team'

beforeAll(async () => {
  await connect()
})

describe('insertOnt: document 1건 저장', () => {
  test('1건의 document를 저장한다.', async () => {
    const item = {
      id: 12,
      name: 'test',
      price: 200,
      remain: 200,
      owner: 'you',
      createdAt: new Date().toISOString(),
    }

    const created = new Items({ ...item })
    const res = await created.save()

    expect(created._id).toBe(res._id)
  })
})

describe('deleteOne: document 1건 삭제', () => {
  test('1건의 document를 제거한다.', async () => {
    const target = await Items.findOne()
    const res = await Items.deleteOne({ _id: target!._id })

    expect(res.deletedCount).toBe(1)
  })
})

describe('updateOne, replaceOne: document 필드를 갱신한다.', () => {
  test('1건의 document를 갱신한다.', async () => {
    const target = await Items.findOne()
    const updateDocument = {
      $set: {
        price: 1_000_000,
      },
    }
    const res = await Items.updateOne({ _id: target!._id }, updateDocument)

    expect(res.matchedCount).toBe(1)
    expect(res.modifiedCount).toBe(1)
  })

  test('document 필드 배열을 갱신한다.', async () => {
    // given
    const user = new User('hi', 30, 'test', new Date().toISOString())
    const team: TeamType = { name: 'test team', createdAt: new Date().toISOString(), users: [user] }
    const created = new Teams({ ...team })
    await created.save()

    // when
    const query = { _id: created._id, 'users.name': { $eq: 'hi' } }
    const updateDocument = { $set: { 'users.$.age': 22 } }
    const res = await Teams.updateOne(query, updateDocument)

    // then
    expect(res.matchedCount).toBe(1)
    expect(res.modifiedCount).toBe(1)

    const updated = await Teams.findOne({ _id: created._id })
    expect(updated?.users[0].age).toBe(22)
  })

  test('1건의 document 필드를 모두 갱신한다.', async () => {
    const target = await Items.findOne()
    const updated: ItemType = {
      id: target!.id + 1_000,
      name: target!.name ?? 'test',
      remain: target!.remain - 1,
      owner: 'new_owner',
      price: target!.price,
      createdAt: target!.createdAt,
    }
    const res = await Items.replaceOne({ _id: target!._id }, updated)

    expect(res.matchedCount).toBe(1)
    expect(res.modifiedCount).toBe(1)
  })
})
