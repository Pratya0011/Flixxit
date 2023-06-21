import { model, Schema } from "mongoose";

const content = new Schema({
    subscription: {
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
}
)

const Content = model('content', content)
export default Content;