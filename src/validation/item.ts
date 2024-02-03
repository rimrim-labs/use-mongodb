import { date, number, object, string } from 'yup'

export const CreateItemSchema = object({
  id: number().integer().positive().required(),
  name: string().required(),
  remain: number().integer().positive().required(),
  price: number().integer().positive().required(),
  owner: string().required(),
  createdAt: date().required(),
})
