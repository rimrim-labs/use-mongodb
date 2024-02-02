import { Agenda, Job } from 'agenda'
import { Items } from '../item/domain/Item'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const DB_URL = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}`

const agenda = new Agenda({ db: { address: DB_URL }, processEvery: '30 seconds' })

interface Data {
  id: number
}

agenda.define('create new item', async (job: Job<Data>) => {
  const { id } = job.attrs.data

  console.log(`job ${job.attrs.name} (${job.attrs._id}) is running...`)

  const item = new Items({
    id,
    name: 'test',
    remain: 100,
    price: 100,
    owner: 'yr',
    createdAt: new Date(),
  })
  await item.save()
})

export async function schedule() {
  await agenda.start()

  await agenda.every('3 minutes', 'create new item', {
    id: Math.floor(Math.random() * 100) + 1,
  })
}
