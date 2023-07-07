import express from 'express'
import { addWatchlist, deleteWatchlist, getWatchlist } from './controllers/watchlistController.js'

const router = express.Router()

router.patch('/addWatchlist/:id',addWatchlist)
router.get('/getWatchlist/:id',getWatchlist)
router.patch('/deleteWatchlist/:id',deleteWatchlist)

export default router