import itemService from '../service/itemService'
import { Request, Response } from 'express'
import CreateItem from '../dto/request/CreateItem'

export async function createItem(req: Request, res: Response) {
  const { body } = req
  const item = new CreateItem(
    body.id,
    body.name,
    body.remain,
    body.price,
    body.owner,
    body.createdAt
  )
  const insertedId = await itemService.save(item)
  return res.status(201).location(`/items/${insertedId}`).json(insertedId)
}

export async function getAll(req: Request, res: Response) {
  const items = await itemService.findAll()
  return res.json(items)
}

export async function getById(req: Request, res: Response) {
  const { id } = req.params
  const item = await itemService.findOne(+id)
  return res.json(item)
}
