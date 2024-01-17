import { Router } from 'express'
import itemService from './service/itemService'
import { ajv } from '../validator/itemValidator'
import CreateItem from './dto/request/CreateItem'
import createHttpError from 'http-errors'

const router = Router()

router.post(
  '/',
  (req, res, next) => {
    const validate = ajv.getSchema<CreateItem>('createItem')
    if (validate && validate(req.body.item)) {
      next()
      return
    }
    next(createHttpError(400, 'Invalid Request Body'))
  },
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
