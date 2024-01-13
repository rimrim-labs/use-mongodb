import { Db, MongoClient } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const URI = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}`

const client = new MongoClient(URI)

let db: Db

async function connectDB() {
  try {
    db = client.db()
  } catch (err) {
    console.log(`db error occurred!: ${err}`)
    await client.close()
  }
}

export { db, connectDB }
