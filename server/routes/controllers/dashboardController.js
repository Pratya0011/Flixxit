import User from "../../model/userModel.js";
import { config } from "dotenv";

config();

export const getAllUsers = async(req,res)=>{
    try {
        const allUsers = await User.find({});
        res.send({
          status: 200,
          message: "All users fetched successfully!",
          data: {
            allUsers,
            user: req.user,
            accessToken: req.newAccessToken
          },
        });
      } catch (err) {
        console.log(err);
      }
}