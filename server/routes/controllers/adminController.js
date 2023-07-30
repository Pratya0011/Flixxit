import User from "../../model/userModel.js";

  export const getUser = async (req,res)=>{
    const id = req.params.id
    try{
      if(!id){
        res.send({
          status:401,
          message:'Invalid request'
        })
      }else{
        const user = await User.findById(id)
        if(!user){
          res.send({
            status:401,
            message:'No user found'
          })
        }else{
          res.send({
            status:200,
            user,
            message:'User found'
          })
        }
      }
    }catch(err){
      res.send({
        status:500,
        message:'Internal server error'
      })
    }
  }
