import User from "../../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import content from "../../model/contentList.js";

config();

export const userSignup = async (req, res) => {
  const { name, email, username, password, role } = req.body;
  try {
    const checkUser = await User.findOne({username});
    if (!checkUser) {
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
      res.send({
        status: 200,
        message: "Signup successful",
      });
    } else {
      res.send({
        status: 409,
        message: "Username already taken!",
      });
    }
  } catch (error) {
    res.send({
      status: 500,
      error: "Internal server error!",
    });
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
    } else {
      bcrypt
        .compare(password, user.password)
        .then((isPasswordValid) => {
          if (isPasswordValid) {
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
              email:user.email,
              id: user._id,
              message: "Login succesfull",
              accessToken: accessToken,
              refreshToken: refreshToken,
            });
          } else {
            return res.send({
              status: 403,
              message: "Invalid password",
            });
          }
        })
        .catch((error) => {
          if (error) {
            return res.send({
              status: 500,
              message: "Internal server error",
            });
          }
        });
    }
  } catch (error) {
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
        res.send({
          status: 403,
          message:"no user found with the username"
        });
      } else {
        const salt = await bcrypt.genSalt(10);
        const newHashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = newHashedPassword;
        await user.save();
        res.send({
          status:200,
          user
        });
      }
    }
  } catch (err) {
    res.send(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updatePassword = async (req, res) => {
  let { oldPassword, newPassword } = req.body;
  let id = req.params.id;
  try {
    if (!oldPassword || !newPassword) {
      return res.status(422).json({
        message: "Please enter old password and a new one",
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      const newHashedPassword = await bcrypt.hash(newPassword, salt);
      const updatedUser = await User.findByIdAndUpdate(id, {
        password: newHashedPassword,
      });
      res
        .status(200)
        .json({ message: "User updated successfully", user: updatedUser });
    }
  } catch (err) {
    res.send(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateName = async (req, res) => {
  let name = req.body.name;
  const id = req.params.id;
  try {
    //check for empty fields in the request body
    if (!name) {
      return res.status(422).json({
        message: "Please enter new name",
      });
    } else {
      const updatedUser = await User.findByIdAndUpdate(id, { name: name });
      res
        .status(200)
        .json({ message: "user update successfuly", user: updatedUser });
    }
  } catch (err) {
    res.send(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getComments = async (req,res)=>{
  const {contentId} = req.params
  try{
    if(!contentId){
      res.send({
        status: 409,
        comments : []
      })
    }else{
      const data = await content.findById(contentId)
      if(!data.comments.length){
        res.send({
          status:200,
          commentCount:0,
          message:"No Comments Found!"
        })
      }else{
        res.send({
          status:200,
          commentCount:data.comments.length,
          comments:[data.comments]
        })
      }
    }
  }catch(err){
    res.send(err);
    res.status(500).json({ message: "Internal server error" });
  }
  }

  export const postComment = async (req,res)=>{
    const {contentId} = req.params;
    const {name, comment} = req.body
    try{
      if(!contentId || !name || !comment){
        console.log('mnb')
      }else{
        const data = await content.findByIdAndUpdate(contentId,{
          $push:{comments:{name:name,comment:comment}}
        },
        {new:true})
        if (!data) {
          res.status(404).json({ message: "Content not found." });
       }
       res.send({
         status:200,
         data
       })
      }
      
    }catch(err){
      res.send(err);
    res.status(500).json({ message: "Internal server error" });
    }
  }

  export const favGenre = async (req,res)=>{
    const {id} = req.params
    const {value} = req.query
    try{
      const user = await User.findByIdAndUpdate(id,{genre:value})
      res.send({
        status:200,
        genre:user.genre
      })
    }catch(err){
      res.send(err);
    res.status(500).json({ message: "Internal server error" });
    }
  }