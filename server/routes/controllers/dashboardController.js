import User from "../../model/userModel.js";
import { config } from "dotenv";

config();

export const getAllUsers = async(req,res)=>{
    try {
        const allUsers = await User.find({});
        res.send({
          status: 200,
          message: "All users fetched successfully!",
          allUsers,
          count: allUsers.length
        });
      } catch (err) {
        res.send({
          status: 500,
          message: "Internal Server Error",
        });
      }
}

export const getallSubscribed = async(req,res)=>{
  try{
    let user = await User.find({"subscription.subscriptionStatus":true})
    res.send({
      status:200,
      user,
      count:user.length
    })
  }catch(err){
    res.send({
      status: 500,
      message: "Internal Server Error",
    });
  }
}

export const gettotalamount = async(req,res)=>{
  try{
    const amount = await User.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" }
        }
      }
    ]);
    res.send({
      status:200,
      amount:amount[0].totalAmount
    })
  }catch(err){
    res.send({
      status: 500,
      message: "Internal Server Error",
    });
  }
}

export const getAllSubscribedUserList = async (req, res) =>{
  try{
    let user = await User.find({"subscription.subscriptionStatus":true})
    if(!user || user.length === 0){
      res.send({
        status:404,
        message: 'No User Found'
      })
    }else{
      res.send({
        status: 200,
        results: user,
        count: user.length
      })
    }
  }catch(error){
    console.error('Error:', error);
    res.send({
      status: 500,
      message: 'Internal Server Error'
    })
  }
}
