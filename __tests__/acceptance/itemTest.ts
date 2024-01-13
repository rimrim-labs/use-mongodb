import request from 'supertest'
import app from '../../src/app'
import { connectDB } from '../../src/db/mongo'
import CreateItem from '../../src/item/dto/request/CreateItem'

beforeAll(() => {
  return connectDB()
})

describe('POST /items', () => {
  test('item 1건을 생성한다.', async () => {
    const item = new CreateItem(1, 'test', 200, 1000, 'me', new Date().toISOString())
    const res = await request(app)
      .post('/items')
      .set('Content-Type', 'application/json')
      .send({ item })
    expect(res.statusCode).toBe(201)
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
})
