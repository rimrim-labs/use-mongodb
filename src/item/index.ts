import { Router } from 'express'
import itemService from './service'

const router = Router()

router.post('/', async function (req, res) {
  const createItem = req.body
  const insertedId = await itemService.save(createItem)
  return res.send(insertedId)
})

router.get('/', async function (req, res) {
  const items = await itemService.findAll()
  return res.send(items)
})

router.get('/:id', async function (req, res) {
  const { id } = req.params
  const item = await itemService.findOne(+id)
  return res.send(item)
})

export default router