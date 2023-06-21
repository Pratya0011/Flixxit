import express from 'express'
import User from '../model/userModel.js'
import jwt  from 'jsonwebtoken'
import { config } from 'dotenv'

config()
const router = express.Router()

const authenticateToken=(req,res,next)=>{
    let token= req.header('x-auth')
    if(!token){
        return res.status(401).send({message:"No Token Provided"})
    }else{
        jwt.verify(token, process.env.JWT_SECRET, (err,user)=>{
            if(err){
                return res.send({
                    status:500,
                    message:'Access not allowed'
                })
            }else{
                req.user = user
            }
        })
    }
    next()
}

router.get('/dashboard',authenticateToken, async(req,res)=>{
    try{
        const allUsers = await User.find({})
        res.send({
            status:200,
            message:'All users fetched successfully!',
            data:{
                allUsers
            }
        })
    }catch(err){
        console.log(err)
    }
})


export default router;