import content from "../../model/contentList.js";

export const topRatedMovies = async (req, res) => {
  try {
    const result = await content
      .find({ $and: [{ media_type: "movie" }, { vote_count: { $gt: 10 } }] })
      .sort({ vote_average: -1 })
      .limit(10);
    res.send({
      status: 200,
      result,
      results: result.length,
    });
  } catch (err) {
    res.send({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

export const popularMovies = async (req, res) => {
  try {
    const result = await content
      .find({ media_type: "movie" })
      .sort({ popularity: -1 })
      .limit(10);
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

export const thrillerMovies = async (req, res) => {
  try {
    const result = await content.find({
      $and: [{ media_type: "movie" }, { genre_ids: 53 }],
    });
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

export const crimeMovies = async (req, res) => {
  try {
    const result = await content.find({
      $and: [{ media_type: "movie" }, { genre_ids: 80 }],
    });
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

export const dramaMovies = async (req, res) => {
  try {
    const result = await content
      .find({
        $and: [
          { media_type: "movie" },
          { genre_ids: 18 },
          { vote_count: { $gt: 10 } },
        ],
      })
      .sort({ vote_average: -1 });
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

export const documentaryMovies = async (req, res) => {
  try {
    const data = await content.find({
      $and: [{ media_type: "movie" }, { genre_ids: 99 }],
    });
    const result = data.filter((data)=> data.poster_path !== null)
    res.send({
      status: 200,
      result,
      results: result.length,
    });
  } catch (err) {
    res.send({
      status: 200,
      message: "Internal server error",
    });
  }
};
export const actionMovies = async (req, res) => {
  try {
    let result = await content.find({
      $and: [{ media_type: "movie" }, { genre_ids: 28 }],
    });
    res.send({
      status: 200,
      result,
      results: result.length,
    });
  } catch (err) {
    res.send({
      status: 500,
      message: "Internal Server Error!",
    });
  }
};
export const adventureMovies = async (req, res) => {
  try {
    let result = await content.find({
      $and: [{ media_type: "movie" }, { genre_ids: 12 }],
    });
    res.send({
      status: 200,
      result,
      results: result.length,
    });
  } catch (err) {
    res.send({
      status: 500,
      message: "Internal Server Error!",
    });
  }
};
export const comedyMovies = async (req, res) => {
  try {
    let result = await content.find({
      $and: [{ media_type: "movie" }, { genre_ids: 35 }],
    });
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
export const horrorMovies = async (req, res) => {
  try {
    let result = await content.find({
      $and: [{ media_type: "movie" }, { genre_ids: 27 }],
    });
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
export const romanceMovies = async (req, res) => {
  try {
    let result = await content.find({
      $and: [{ media_type: "movie" }, { genre_ids: 10749 }],
    });
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

export const likes = async (req,res)=>{
const {contentId} = req.params
try{
  const result = await content.findByIdAndUpdate(contentId,{ $inc: { rating_likes: 1 } }, { new: true })
  res.send({
    status:200,
    result
  })
}catch (err) {
  res.send({
    status: 500,
    message: "Internal server error",
  });
}
}
export const dislikes = async (req,res)=>{
  const {contentId} = req.params
  try{
    const result = await content.findByIdAndUpdate(contentId,{ $inc: { rating_dislikes: 1 } }, { new: true })
    res.send({
      status:200,
      result
    })
  }catch (err) {
    res.send({
      status: 500,
      message: "Internal server error",
    });
  }
  }

  export const getLikes = async (req,res)=>{
    const {contentId} = req.params
    try{
      const result = await content.findById(contentId)
      const likes = result.rating_likes
      res.send({
        status:200,
        likes
      })
    }catch (err) {
      res.send({
        status: 500,
        message: "Internal server error",
      });
  }
}