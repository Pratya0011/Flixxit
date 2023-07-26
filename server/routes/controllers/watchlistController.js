import content from "../../model/contentList.js";
import User from "../../model/userModel.js";

export const addWatchlist = async (req, res) => {
  try {
    const { id } = req.params;
    const {contentId} = req.query
    if (!id || !contentId) {
      res.send({
        status: 422,
        error: "Bad Request",
      });
    } else {
      const user = await User.findById(id)
      if(user.watchlist.contentId.includes(contentId)){
        res.send({
          status: 409,
          message:'content already exist'
        })
      }else{
        const user = await User.findByIdAndUpdate(
          id,
          { $push: { "watchlist.contentId": contentId } },
          { new: true }
        );
        const contentPromise = user.watchlist.contentId.map(async (data) => {
          const list = await content.findById(data);
          return list;
        });
        const contentResult = await Promise.all(contentPromise);
        res.send({
          status: 200,
          contentResult,
        });
      }
      
    }
  } catch (err) {
    res.send({
      status: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
};
export const getWatchlist = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if(user.watchlist.contentId.length>0){
      const contentPromise = user.watchlist.contentId.map(async (data) => {
        const list = await content.findById(data);
        return list;
      });
      const contentResult = await Promise.all(contentPromise);
      res.send({
        status: 200,
        contentResult,
        results: contentResult.length,
      });
    }else{
      res.send({
        status: 401,
        contentResult:[],
        message: 'No content found'
      })
    }
  } catch (err) {
    res.send({
      status: 500,
      err:err.name,
      success: false,
      message: "Internal server error",
    });
  }
};
export const deleteWatchlist = async(req,res)=>{
  try{
    const { id } = req.params;
    const contentId = req.query.contentId;
    if (!id || !contentId) {
      res.send({
        status: 422,
        error: "Bad Request",
      });
    }else {
      const user = await User.findById(id)
        const removeatchlist = user.watchlist.contentId.filter(data=>data!=contentId)
        const updatedWatchlist = await User.findByIdAndUpdate(id,{"watchlist.contentId": removeatchlist },{new:true})
        const contentPromise = updatedWatchlist.watchlist.contentId.map(async (data) => {
          const list = await content.findById(data);
          return list;
        });
        const contentResult = await Promise.all(contentPromise);
      res.send({
        status: 200,
        contentResult,
      });
    }
  }catch(err){
    res.send({
      status:500,
      success: false,
      message:'Internal server error'
    })
  }
}