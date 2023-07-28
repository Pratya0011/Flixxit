import express from 'express'
import {  getUser } from './controllers/adminController.js'


const router = express.Router()

router.get('/signup', (req,res)=>{
    res.send('signup page')
})


router.get('/getUser/:id', getUser)
export default router;