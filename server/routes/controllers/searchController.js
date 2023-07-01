import content from "../../model/contentList.js";

export const searchContent =async(req,res)=>{
    try{
        let {name} = req.body
        const result = await content.findOne({$or: [{name:name}, {title:name}]})
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
            msg:"Internal server Error",
            err:err.name
        })
    }
}