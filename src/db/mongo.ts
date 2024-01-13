import { Db, MongoClient } from 'mongodb'

const URI = 'mongodb://127.0.0.1:27017'

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
