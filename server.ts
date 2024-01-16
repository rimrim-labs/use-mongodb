import app from './src/app'
import { connect } from './src/mongo'

const PORT = 3000

app.listen(PORT, async () => {
  await connect()
  console.log(`Example server listening on port ${PORT}`)
})
