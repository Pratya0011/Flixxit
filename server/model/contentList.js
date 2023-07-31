import { model, Schema } from "mongoose";

const contentSchema = new Schema({
  adult: {
    type: Boolean,
  },
  backdrop_path: {
    type: String,
  },
  first_air_date: {
    type: String,
  },
  genre_ids: [Number],
  id: {
    type: Number,
  },
  name: {
    type: String,
  },
  origin_country: [String],
  original_language: {
    type: String,
  },
  original_name: {
    type: String,
  },
  original_title: {
    type: String,
  },
  overview: {
    type: String,
  },
  popularity: { type: Number },
  poster_path: {
    type: String,
  },
  release_date: {
    type: Date,
    default: Date.now()
  },
  title: {
    type: String,
  },
  video: Boolean,
  vote_average:Number,
  vote_count: {
    type: Number,
  },
  media_url:{
    type:String,
  },
  media_type:{
    type: String,
  },
  rating_likes:{
    type: Number,
    default:0
  },
  rating_likes:{
    type: Number,
    default:0
  },
  rating_dislikes:{
    type: Number,
    default:0
  },
  rating_average:{
    type: Number,
    default:0
  },
  rated_users:{
    type: Number,
    default:0
  },
  comments:[
    {
    name:{
      type: String
    },
    comment:{
      type: String
    }
  }
]
});

const content = model('content',contentSchema)
export default content