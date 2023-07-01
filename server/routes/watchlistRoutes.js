import express from 'express'
import { addWatchlist } from './controllers/watchlistController.js'

const router = express.Router()

router.patch('/addWatchlist/:id',addWatchlist)

export default router