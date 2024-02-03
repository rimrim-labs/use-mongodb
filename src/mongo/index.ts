import mongoose from 'mongoose'

import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const DB_URL = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}`

export async function connect() {
  mongoose.set('debug', true)
  await mongoose.connect(DB_URL)
}
