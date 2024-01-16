import { connect } from '../../src/mongo'
import { Items } from '../../src/item/domain/Item'
import { ParentModel } from '../../src/parent/domain/Parent'

beforeAll(async () => {
  await connect()
})

describe('Mongoose update 테스트', () => {
  test('도큐먼트 값을 갱신하고 저장하면 필드가 업데이트 된다.', async () => {
    const item = await Items.findOne()
    if (item) {
      item.name = 'finish'
      item.save()
    }

    const updated = await Items.findOne({ _id: item?._id })

    expect(updated?.name).not.toBeUndefined()
    expect(updated?.name).toBe('finish')
  })
})

describe('Mongoose 서브도큐먼트 테스트', () => {
  test('배열 필드에 값을 추가한다.', async () => {
    const parent = new ParentModel({
      name: 'test',
      age: 22,
    })

    /**
     * Mongoose DocumentArray 타입 - cihld _id 필드 생략 가능
     */
    parent.child.push({ info: 'hi' })
    console.log(parent.child[0])

    await parent.save()
  })

  test('배열 필드에서 값을 제거한다.', async () => {
    const parent = await ParentModel.findOne({ name: 'test' })

    if (parent?.child.length) {
      parent?.child.pop()
      await parent?.save()
    }
  })
})

describe('MongoDB 조회 테스트', () => {
  test('도큐먼트를 조회한다.', async () => {
    const parents = await ParentModel.find({ name: 'test' }, 'name age')
    expect(parents[0].name).toBe('test')
    expect(parents[0].child).toBeUndefined()
  })

  test('쿼리 빌더를 사용해 도큐먼트를 조회한다.', async () => {
    const parents = await ParentModel.find().where('name').equals('test').select('name age').exec()
    expect(parents[0].name).toBe('test')
    expect(parents[0].child).toBeUndefined()
  })
})
