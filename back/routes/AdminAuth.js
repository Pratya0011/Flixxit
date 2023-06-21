import express from 'express'
import User from '../model/userModel.js'
import bcrypt from 'bcrypt'


const router = express.Router()

router.get('/signup', (req,res)=>{
    res.send('signup page')
})

router.post('/signup', async(req, res)=>{
   const {name,email,username,password,role} = req.body;
   try{
    const salt = await bcrypt.genSalt(10)
   const hashedPassword = await bcrypt.hash(password,salt)
    const user = new User({name,email,username,password:hashedPassword,role})
    await user.save()
    res.send(user)
   }catch{
    req.send('error')
   }
})
export default router;