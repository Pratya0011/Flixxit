import content from "../../model/contentList.js";

export const searchContent =async(req,res)=>{
    try{
        let {id} = req.params
        const result = await content.findById(id)
        if(!result){
            res.send({
                status:401,
                message:'No such content'
            })
        }else{
            res.send({
                statue:200,
                result
            })
        }
    }catch(err){
        res.send({
            status:500,
            msg:"Internal server Error"
        })
    }
}