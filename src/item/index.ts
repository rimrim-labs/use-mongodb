import { Router } from 'express'
import { validate } from '../validation'
import { CreateItemSchema } from '../validation/item'
import * as itemController from './controller/itemController'
import { wrap } from '../middleware/asyncErrorHandler'

const router = Router()

router.post(
  '/',
  validate({
    body: CreateItemSchema,
  }),
  wrap(async function (req, res) {
    await itemController.createItem(req, res)
  })
)

router.get(
  '/',
  wrap(async function (req, res) {
    await itemController.getAll(req, res)
  })
)

router.get(
  '/:id',
  wrap(async function (req, res) {
    await itemController.getById(req, res)
  })
)

export default router
