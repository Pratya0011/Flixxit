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
          success: false,
          message: "Internal Server Error",
        });
      }
};
export const getWatchlist =async(req,res)=>{
  try{
    const {id} = req.params
    const user = await User.findById(id)
    const contentPromise = user.watchlist.contentId.map(async(data)=>{
      const list = await content.findById(data)
      return list
    })
    const contentResult =await Promise.all(contentPromise)
    res.send({
      status:200,
      contentResult,
      results:contentResult.length
    })
  }catch(err){
    res.send({
      status:500,
      success:false,
      message:"Internal server error"
    })
  }
}