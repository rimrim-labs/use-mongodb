import app from './src/app'
import { connect } from './src/mongo'
import { schedule } from './src/infrastructure/cron'

const PORT = 3000

app.listen(PORT, async () => {
  await connect()
  await schedule()
  console.log(`Example server listening on port ${PORT}`)
})
