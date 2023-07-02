import express from 'express'
import { addWatchlist, getWatchlist } from './controllers/watchlistController.js'

const router = express.Router()

router.patch('/addWatchlist/:id',addWatchlist)
router.get('/getWatchlist/:id',getWatchlist)

export default router