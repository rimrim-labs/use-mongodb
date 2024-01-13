import request from 'supertest'
import app from '../../src/app'
import { connectDB } from '../../src/db/mongo'

beforeAll(() => {
  return connectDB()
})

describe('GET /items', () => {
  test('item 목록을 반환한다.', async () => {
    const res = await request(app).get('/items')
    expect(res.statusCode).toBe(200)
  })
})
