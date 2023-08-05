import { model, Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String,
  },
  role: {
    type: String, //user/admin
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  amount:{
    type: Number,
    default:0
  },
  genre:{
    type: String,
    default: null
  },
  subscription:{
    subscriptionType: {
        type:String,
        default: 'nonSubscribed'
    },
    subscriptionStatus:{
        type:Boolean,
        default: false
    },

  },
  watchlist: {
    contentId:{
        type: [String],
        default: []
    }
  },
  history:{
    viewedContentIds:{
      type:[String],
      default:[]
    }
  },
  payment:{
    amountPaid :{
        type:Number,
        default:0
    },
    transactionId:{
        type:String,
        default:null
    },
    paidAt:{
        type:String,
        default:null
    },
    expiredDate:{
        type:String,
        default:null
    },
    planName:{
        type: String,
        default: 'no-plan'
    },
    status:{
        type:String
    }
  }
});

const User = model("user", userSchema);
export default User;
