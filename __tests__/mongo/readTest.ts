import { connectDB, db } from '../../src/db/mongo'
import { Collection, SortDirection } from 'mongodb'
import Item from '../../src/item/domain/Item'

let items: Collection<Item>

beforeAll(async () => {
  await connectDB()
  items = db.collection('items')
})

describe('findOne: document 1건 조회', () => {
  test('이름으로 1건의 document를 조회한다.', async () => {
    const res = await items.findOne({ name: 'test' })

    expect(res).not.toBeNull()
    expect(res?.id).toBe(1)
    expect(res?.remain).toBe(200)
    expect(res?.price).toBe(1000)
    expect(res?.owner).toBe('me')
  })

  test('_id로 1건의 document를 조회한다.', async () => {
    const item = await items.findOne()
    const res = await items.findOne({ _id: item!._id })

    expect(res).toStrictEqual(item)
  })
})

describe('find: document 여러 건을 조회.', () => {
  test('모든 document를 순차적으로 조회한다.', async () => {
    /* Cursor 객체 반환. */
    const res = items.find()

    for await (const doc of res) {
      expect(doc._id).not.toBe('')
    }
  })

  test('모든 document를 한 번에 조회한다.', async () => {
    const res = await items.find().toArray()

    expect(res.length).toBeGreaterThanOrEqual(0)
  })
})

describe('distinct: 중복 없는 데이터 조회.', () => {
  test('중복을 제거한 key 값을 조회한다.', async () => {
    const ids = await items.distinct('_id')
    const names = await items.distinct('name')

    expect(ids.length).toBeGreaterThan(1)
    expect(names.length).toBe(1)
  })
})

describe('sort: 키 값을 기준으로 데이터 정렬.', () => {
  test('오름차순으로 정렬된 데이터를 조회한다.', async () => {
    const sort: { [key: string]: SortDirection } = { _id: 'asc' }
    const res = await items.find().sort(sort).toArray()

    expect(res[0]._id! <= res[res.length - 1]._id!).toBeTruthy()
  })

  test('내림차순으로 정렬된 데이터를 조회한다.', async () => {
    const sort: { [key: string]: SortDirection } = { _id: 'desc' }
    const res = await items.find().sort(sort).toArray()

    expect(res[0]._id! >= res[res.length - 1]._id!).toBeTruthy()
  })

  test('동점 상황에서는 다음 정렬 기준으로 정렬한다.', async () => {
    const sort: { [key: string]: SortDirection } = { name: 'desc', createdAt: 'desc' }
    const res = await items.find().sort(sort).toArray()

    expect(res[0].name).toBe(res[1].name)
    expect(res[0].createdAt > res[1].createdAt).toBeTruthy()
  })
})

describe('skip: document 읽기를 스킵한다.', () => {
  test('상위 2건의 document를 스킵하여 조회한다.', async () => {
    const sort: { [key: string]: SortDirection } = { _id: 'desc' }

    const all = await items.find().sort(sort).toArray()
    const skipped = await items.find().sort(sort).skip(2).toArray()

    expect(skipped).not.toContainEqual(all[0])
    expect(skipped).not.toContainEqual(all[1])
  })
})

describe('limit: 읽어오는 document 수 제한.', () => {
  test('2건의 데이터만 읽어온다.', async () => {
    const sort: { [key: string]: SortDirection } = { _id: 'desc' }
    const res = await items.find().sort(sort).limit(2).toArray()

    expect(res.length).toBe(2)
  })

  test('skip과 함께 사용될 경우 skip이 먼저 적용된다.', async () => {
    const sort: { [key: string]: SortDirection } = { _id: 'desc' }
    const res = await items.find().sort(sort).skip(100_000).limit(2).toArray()

    expect(res.length).toBe(0)
  })
})

describe('projection: 특정 필드만 조회.', () => {
  test('단일 필드 값만 조회한다.', async () => {
    const projection = { name: 1 }
    const res = await items.find().project(projection).toArray()

    expect(res[0]._id).not.toBeUndefined()
    expect(res[0].name).not.toBeUndefined()
    expect(res[0].price).toBeUndefined()
  })
})
