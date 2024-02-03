import request from 'supertest'
import app from '../../src/app'
import { connect } from '../../src/mongo'
import CreateItem from '../../src/item/dto/request/CreateItem'

beforeAll(async () => {
  await connect()
})

describe('POST /items', () => {
  test('item 1건을 생성한다.', async () => {
    const item = new CreateItem(1, 'test', 200, 1000, 'me', new Date())
    const res = await request(app)
      .post('/items')
      .set('Content-Type', 'application/json')
      .send({ item })
    expect(res.statusCode).toBe(201)
  })

  test('body가 item을 포함하지 않으면 400을 반환한다.', async () => {
    const item = { id: 1, name: 'test' }
    const res = await request(app)
      .post('/items')
      .set('Content-Type', 'application/json')
      .send({ item })

    expect(res.statusCode).toBe(400)
    expect(res.body).toBe('Invalid Request Body')
  })
})

describe('GET /items', () => {
  test('item 목록을 반환한다.', async () => {
    const res = await request(app).get('/items')
    expect(res.statusCode).toBe(200)
  })
})

describe('GET /items/:id', () => {
  test('item 1건을 반한한다.', async () => {
    const res = await request(app).get('/items/1')
    expect(res.statusCode).toBe(200)
  })

  test('item이 존재하지 않으면 400을 반환한다.', async () => {
    const notExistId = 1_000_000_000
    const res = await request(app).get(`/items/${notExistId}`)
    expect(res.statusCode).toBe(400)
    expect(res.body).toBe(`item ${notExistId} does not exist!`)
  })
})
