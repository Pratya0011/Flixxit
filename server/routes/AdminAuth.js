import express from 'express'
import { adminSignup } from './controllers/adminController.js'


const router = express.Router()

router.get('/signup', (req,res)=>{
    res.send('signup page')
})

router.post('/signup',adminSignup)
export default router;