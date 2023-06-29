import content from "../../model/contentList.js";

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
    let toprated = arr.sort((a, b) => b.vote_count - a.vote_count);
    res.send({
      status: 200,
      toprated,
      results: arr.length,
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
    let popular = arr.sort((a, b) => b.vote_average - a.vote_average);
    res.send({
      status: 200,
      popular,
      results: arr.length,
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
    let topTen = arr.sort((a, b) => b.vote_average - a.vote_average);

    res.send({
      status: 200,
      topTen,
      results: topTen.length,
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
    let doc = arr.sort((a, b) => b.vote_average - a.vote_average);
    res.send({
      status: 200,
      doc,
      results:doc.length
    });
  } catch (err) {
    res.send({
      status: 500,
      message: "Internal Server Error",
    });
  }
};
