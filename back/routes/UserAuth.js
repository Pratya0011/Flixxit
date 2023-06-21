import express from 'express'
import User from '../model/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
config()


const router = express.Router()

router.get('/signup', (req,res)=>{
    res.send('user signup page')
})
router.post('/signup', async(req,res)=>{
    const {name,email,username,password,role} = req.body
    try{
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        const user =  new User({name,email,username,password:hashedPassword,role})
        await user.save()
        res.send(user)
    }catch(error){
        res.send(error)
    }
});

router.post('/login', async(req,res)=>{
    const {username,password} = req.body
    try{
        const user = await User.findOne({username})
        if(!user){
            return res.send({
                status: 403,
                message:'Invalid username or password!'
            })
        }

        const isPasswordValid =  bcrypt.compare(password, user.password)
        if(!isPasswordValid){
            return res.send({
                status:403,
                message: 'Invalid password'
            })
        }else{
            const token = jwt.sign({userId:user._id}, process.env.JWT_SECRETclear)
            res.send({
                status:200,
                name: user.name,
                message:'Login succesfull',
                token: token
            })
        }
    }catch(error){
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }

})

export default router