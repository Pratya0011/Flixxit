import content from "../../model/contentList.js";

export const recomendedVideo = async (req,res)=>{
  const {genre} = req.query
  try{
     if(genre){
      const arr = await content.find({genre_ids:genre}).limit(10)
      const result = arr.sort((a, b) => b.rating_count - a.rating_count);
      res.send({
        status: 200,
        result,
        results: result.length,
      });
    }else{
      res.send({
        status:200,
        result:[]
      })
    }
  }catch(err){
    res.send({
      status: 500,
      message: "Internal server error",
    });
  }
}

export const topRatedFlixxit = async (req, res) => {
  try {
    const movies = await content
      .find({ $and: [{ media_type: "movie" }, { vote_count: { $gt: 10 } }] })
      .sort({ vote_average: -1 })
      .limit(5);
    const tv = await content
      .find({ $and: [{ media_type: "tv" }, { vote_count: { $gt: 10 } }] })
      .sort({ vote_average: -1 })
      .limit(5);
    let arr = [...movies, ...tv];
    let result = arr.sort((a, b) => b.vote_count - a.vote_count);
    res.send({
      status: 200,
      result,
      results: result.length,
    });
  } catch (err) {
    res.send({
      status: 500,
      message: "Internal server error",
    });
  }
};

export const popularFlixxit = async (req, res) => {
  try {
    const movie = await content
      .find({ media_type: "movie" })
      .sort({ popularity: -1 })
      .limit(5);
    const tv = await content
      .find({ media_type: "tv" })
      .sort({ popularity: -1 })
      .limit(5);
    let arr = [];
    arr = [...movie, ...tv];
    let result = arr.sort((a, b) => b.vote_average - a.vote_average);
    res.send({
      status: 200,
      result,
      results: result.length,
    });
  } catch (err) {
    res.send({
      status: 500,
      message: "Internal server error",
    });
  }
};
export const toptenFlixxit = async (req, res) => {
  try {
    const movie = await content
      .find({
        $and: [{ media_type: "movie" }, { vote_average: { $gte: 7 } }],
      })
      .sort({ vote_count: -1 })
      .limit(5);
    const tv = await content
      .find({ $and: [{ media_type: "tv" }, { vote_average: { $gte: 7 } }] })
      .sort({ vote_count: -1 })
      .limit(5);
    let arr = [...movie, ...tv];
    let result = arr.sort((a, b) => b.vote_average - a.vote_average);

    res.send({
      status: 200,
      result,
      results: result.length,
    });
  } catch (err) {
    res.send({
      statue: 500,
      message: "Internal server error",
    });
  }
};
export const documentaryFlixxit = async (req, res) => {
  try {
    const movie = await content
      .find({ $and: [{ media_type: "movie" }, { genre_ids: 99 }] })
      .sort({ vote_average: -1 })
      .limit(5);
    const tv = await content
      .find({ $and: [{ media_type: "tv" }, { genre_ids: 99 }] })
      .sort({ vote_average: -1 })
      .limit(5);
    let arr = [...movie,...tv];
    let result = arr.sort((a, b) => b.vote_average - a.vote_average);
    res.send({
      status: 200,
      result,
      results:result.length
    });
  } catch (err) {
    res.send({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

export const getTitleFlixxit = async (req,res) =>{
  const {contentId} = req.query
  try{
    if(!contentId){
      res.send({
        statue:409,
        message:'error fetching content'
      })
    }else{
      const result = await content.findById(contentId)
      res.send({
        status:200,
        result:[result]
      })
    }
  } catch(err){
    res.send({
      status: 500,
      message: "Internal Server Error",
    });
  }
}