import { Router } from 'express'

const router = Router()

router.get('/', function (req, res) {
  res.send('<div>Hello world!</div>')
})

export default router
