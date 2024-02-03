import { Router } from 'express'
import itemService from './service/itemService'
import { validate } from '../validation'
import { CreateItemSchema } from '../validation/item'

const router = Router()

router.post(
  '/',
  async (req, res, next) => validate(req.body.item, CreateItemSchema, next),
  async function (req, res, next) {
    try {
      const { item } = req.body
      const insertedId = await itemService.save(item)
      return res.status(201).location(`/items/${insertedId}`).json(insertedId)
    } catch (err) {
      next(err)
    }
  }
)

router.get('/', async function (req, res, next) {
  try {
    const items = await itemService.findAll()
    return res.json(items)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async function (req, res, next) {
  try {
    const { id } = req.params
    const item = await itemService.findOne(+id)
    return res.json(item)
  } catch (err) {
    next(err)
  }
})

export default router
