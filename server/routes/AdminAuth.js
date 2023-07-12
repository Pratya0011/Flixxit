import express from 'express'
import { adminSignup, getUser } from './controllers/adminController.js'


const router = express.Router()

router.get('/signup', (req,res)=>{
    res.send('signup page')
})

router.post('/signup',adminSignup)
router.get('/getUser/:id', getUser)
export default router;