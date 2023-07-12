import User from "../../model/userModel.js";
import bcrypt from "bcrypt";

export const adminSignup = async (req, res) => {
    const { name, email, username, password, role } = req.body;
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = new User({
        name,
        email,
        username,
        password: hashedPassword,
        role,
      });
      await user.save();
      res.send(user);
    } catch {
      req.send("error");
    }
  };
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