import { model, Schema } from "mongoose";

const plan = new Schema({
        planName: {
            type:String,
            default: 'Gold'
        },
        price:{
            type: Number,
            default: 100
        },
        duration:{
            type: String,
            default: 'Monthly'
        },
    }
)

const Plan = model('plan', plan)
export default Plan;