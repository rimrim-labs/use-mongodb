import User from '../../user/domain/User'
import mongoose, { Schema } from 'mongoose'

interface TeamType {
  name: string
  createdAt: string
  users: User[]
}

const TeamSchema = new Schema({
  name: String,
  createdAt: { type: String, default: new Date().toISOString() },
  users: { type: Array },
})

const Teams = mongoose.model('Teams', TeamSchema)

export { Teams, TeamType }
