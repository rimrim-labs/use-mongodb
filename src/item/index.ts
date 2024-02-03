import { Router } from 'express'
import { validate } from '../validation'
import { CreateItemSchema } from '../validation/item'
import * as itemController from './controller/itemController'

const router = Router()

router.post(
  '/',
  async (req, res, next) => validate(req.body.item, CreateItemSchema, next),
  async function (req, res, next) {
    try {
      await itemController.createItem(req, res)
    } catch (err) {
      next(err)
    }
  }
)

router.get('/', async function (req, res, next) {
  try {
    await itemController.getAll(req, res)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async function (req, res, next) {
  try {
    await itemController.getById(req, res)
  } catch (err) {
    next(err)
  }
})

export default router
