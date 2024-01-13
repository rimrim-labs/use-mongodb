import app from './src/app'
import { connectDB } from './src/db/mongo'

const PORT = 3000

app.listen(PORT, async () => {
  await connectDB()
  console.log(`Example server listening on port ${PORT}`)
})
