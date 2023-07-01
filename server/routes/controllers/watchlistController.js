import content from "../../model/contentList.js";
import User from "../../model/userModel.js";

export const addWatchlist = async(req,res)=>{
    try {
        const { id } = req.params;
        const contentId = req.query.contentId;
        if (!id || !contentId) {
          res.send({
            status: 422,
            error: 'Bad Request',
          });
        } else {
          const user = await User.findByIdAndUpdate(id,{$push:{'watchlist.contentId': contentId}},{new:true})
          res.send({
            status: 200,
            user,
          });
        }
      } catch (err) {
        res.send({
          status: 500,
          err: err.code,
          success: false,
          message: "Internal Server Error",
        });
      }
}