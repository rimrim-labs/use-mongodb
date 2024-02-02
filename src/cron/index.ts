import { Agenda, Job } from 'agenda'
import { Items } from '../item/domain/Item'
import dotenv from 'dotenv'
import { addMilliseconds } from 'date-fns'

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

agenda.on('fail', (err, job) => {
  console.error('err occurred!')
  job.attrs.nextRunAt = addMilliseconds(new Date(), 10_000) // retry 10 seconds later
  job.save()
})

export async function schedule() {
  await agenda.start()

  await agenda.every('3 minutes', 'create new item', {
    id: Math.floor(Math.random() * 100) + 1,
  })
}
