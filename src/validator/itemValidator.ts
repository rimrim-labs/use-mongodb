import Ajv, { JSONSchemaType } from 'ajv'
import CreateItem from '../item/dto/request/CreateItem'

export const ajv = new Ajv()

const createItemSchema: JSONSchemaType<CreateItem> = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    name: { type: 'string' },
    remain: { type: 'integer' },
    price: { type: 'integer' },
    owner: { type: 'string' },
    createdAt: { type: 'string' },
  },
  required: ['id', 'name', 'remain', 'price', 'owner', 'createdAt'],
  additionalProperties: false,
}

ajv.addSchema(createItemSchema, 'createItem')
