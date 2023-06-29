import User from "../../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();



export const userSignup = async (req, res) => {
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
  } catch (error) {
    res.send(error);
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.send({
        status: 403,
        message: "Invalid username or password!",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.send({
        status: 403,
        message: "Invalid password",
      });
    } else {
      const accessToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1m" }
      );
      const refreshToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_REFRESHSECRET,
        { expiresIn: "30d" }
      );
      res.send({
        status: 200,
        name: user.name,
        message: "Login succesfull",
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const forgotPassword = async (req, res) => {
  const { username, newPassword } = req.body;
  try {
    if (!username || username === "") {
      return res.status(403).json({ message: "Please enter a valid email" });
    } else {
      const user = await User.findOne({ username: username });
      if (!user) {
        res.send("no user found with the username", username);
      } else {
        const salt = await bcrypt.genSalt(10);
        const newHashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = newHashedPassword;
        await user.save();
        res.send(user);
      }
    }
  } catch (err) {
    res.send(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updatePassword = async(req,res)=>{
    let {oldPassword,newPassword}= req.body
    let id = req.params.id
    try{
        if(!oldPassword ||!newPassword ){
            return res.status(422).json({
                message: "Please enter old password and a new one"
            })
        }else{
            const salt=await bcrypt.genSalt(10);
            const newHashedPassword = await bcrypt.hash(newPassword,salt)
            const updatedUser = await User.findByIdAndUpdate(id, {password:newHashedPassword})
            res.status(200).json({ message: 'User updated successfully', user: updatedUser });
        }
    }catch(err){
        res.send(err)
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const updateName =async(req,res)=>{
    let name = req.body.name
    const id = req.params.id
try{
    //check for empty fields in the request body
    if (!name ) {
        return res.status(422).json({
            message: "Please enter new name"
        })
    }else{
        const updatedUser = await User.findByIdAndUpdate(id,{name:name})
        res.status(200).json({message:'user update successfuly',user:updatedUser})
    }
}catch(err){
    res.send(err)
        res.status(500).json({ message: 'Internal server error' });
}
}
