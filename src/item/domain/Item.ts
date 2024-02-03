import mongoose from 'mongoose'

/**
 * Item type
 */
interface ItemType {
  id: number
  name: string
  remain: number
  price: number
  owner: string
  createdAt: Date
}

/**
 * Mongoose Schema
 */
const ItemSchema = new mongoose.Schema<ItemType>(
  {
    id: Number,
    name: String,
    remain: Number,
    price: Number,
    owner: String,
    createdAt: Date,
  },
  {
    timestamps: {
      createdAt: 'insertedAt',
    },
  }
)

/**
 * Compile Schema to Mongoose Model
 * - create document
 */
const Items = mongoose.model('Item', ItemSchema)

export { ItemType, Items }
