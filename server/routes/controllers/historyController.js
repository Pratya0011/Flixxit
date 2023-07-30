import content from "../../model/contentList.js";
import User from "../../model/userModel.js";

export const addHistory = async (req,res)=>{
    try{
        const { id } = req.params;
        const {contentId} = req.query
        if (!id || !contentId) {
            res.send({
              status: 422,
              error: "Bad Request",
            });
          }else {
            const user = await User.findById(id)
            if(user.history.viewedContentIds.includes(contentId)){
                res.send({
                  status: 409,
                  message:'content already exist'
                })
              }else{
                const user = await User.findByIdAndUpdate(
                  id,
                  { $push: { "history.viewedContentIds": { $each: [contentId], $position: 0 }} },
                  { new: true }
                );
                const contentPromise = user.history.viewedContentIds.map(async (data) => {
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
    }catch (err) {
        res.send({
          status: 500,
          success: false,
          message: "Internal Server Error",
        });
      }
}

export const getHistory = async(req,res)=>{
    try{
        const { id } = req.params;
        const user = await User.findById(id);
        if(user.history.viewedContentIds.length>0){
            const contentPromise = user.history.viewedContentIds.map(async (data) => {
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
    }catch (err) {
        res.send({
          status: 500,
          success: false,
          message: "Internal Server Error",
        });
      }
}