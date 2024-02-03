import { Items } from '../../src/item/domain/Item'
import { connect } from '../../src/mongo'

beforeAll(async () => {
  await connect()
})

describe('date 테스트', () => {
  it('yyyy-MM-dd 형식의 date 타입을 삽입한다.', async () => {
    const item = new Items({
      id: 102,
      name: 'date test',
      price: 999,

      // createdAt: new Date("Sat, 03 Feb 2024 00:00:00 GMT")
      createdAt: '2024-02-03',
    })
    await item.save()
  })

  it('yyyy-MM-dd 형식으로 저장한 date 타입을 조회한다.', async () => {
    const item = await Items.findOne({
      id: 102,
    })

    expect(item!.createdAt).toBeInstanceOf(Date)
  })
})
