import Plan from "../../model/contentModel.js";

export const getPlan = async (req,res)=>{
    try{
        const plan = await Plan.find()
        res.send({
            status:200,
            plan:plan
        })
    }catch(err){
        res.send({
            status:500,
            message:"Error in fetching plans"
        })
    }
}

export const postPlan = async (req,res)=>{
    try{
        const {planName,price,duration}= req.body
        const plan = new Plan({
            planName,
            price,
            duration
        })
        await plan.save()
        res.send({
            status:200,
            plan
        })
    }catch(err){
        res.send({
            status:500,
            message:'error while creating a plan'
        })
    }
}