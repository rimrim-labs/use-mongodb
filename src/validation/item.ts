import yup from './config'

export const CreateItemSchema = yup.object({
  id: yup.number().integer().positive().required(),
  name: yup.string().required(),
  remain: yup.number().integer().positive().required(),
  price: yup.number().integer().positive().required(),
  owner: yup.string().required(),
  createdAt: yup.date().required(),
})
