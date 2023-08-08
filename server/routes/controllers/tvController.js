import content from "../../model/contentList.js";

export const topRatedTv = async (req, res) => {
  try {
    const result = await content
      .find({ $and: [{ media_type: "tv" }, { vote_count: { $gt: 10 } }] })
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
export const popularTv = async (req, res) => {
  try {
    const data = await content
      .find({ media_type: "tv" })
      .sort({ popularity: -1 })
      .limit(12);

      const result = data.filter(data=> data.name!="Buddha"&& data.name!="Taarak Mehta Ka Ooltah Chashmah")
    res.send({
      status: 200,
      result,
      results: result.length,
    });
  } catch (err) {
    res.send({
      status: 500,
      message: "Internal server error!",
    });
  }
};
export const crimeTv = async (req, res) => {
  try {
    const result = await content.find({
      $and: [{ media_type: "tv" }, { genre_ids: 80 }],
    });
    res.send({
      status: 200,
      result,
      results: result.length,
    });
  } catch (err) {
    res.send({
      status: 500,
      message: " Internal Server Error!",
    });
  }
};
export const dramaTv = async (req, res) => {
  try {
    const result = await content.find({
      $and: [{ media_type: "tv" }, { genre_ids: 18 }],
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
export const actionAndAdventure = async (req, res) => {
  try {
    const result = await content.find({
      $and: [{ media_type: "tv" }, { genre_ids: 10759 }],
    });
    res.send({
      status: 200,
      result,
      results: result.length,
    });
  } catch (err) {
    res.send({
      status: 500,
      message: "Internal server error!",
    });
  }
};
export const documentaryTv = async (req, res) => {
  try {
    const value = await content.find({
      $and: [{ media_type: "tv" }, { genre_ids: 99 }],
    });
    const result = value.filter(data=> data.name !== 'Samvidhaan: The Making of the Constitution of India')
    res.send({
      status: 200,
      result,
      results: result.length,
    });
  } catch (err) {
    res.send({
      status: 500,
      message: "Internal server error!",
    });
  }
};
export const comedyTv = async (req, res) => {
  try {
    const result = await content.find({
      $and: [{ media_type: "tv" }, { genre_ids: 35 }],
    });
    res.send({
      status: 200,
      result,
      results: result.length,
    })
  } catch (err) {
    res.send({
      status: 500,
      message: " Internal Server Error!",
    });
  }
};
export const mysteryTv=async(req,res)=>{
  try{
    const result = await content.find({
      $and: [{ media_type: "tv" }, { genre_ids: 9648 }],
    });
    res.send({
      status: 200,
      result,
      results: result.length,
    })
  }catch(err){
    res.send({
      status: 500,
      message: " Internal Server Error!",
    });
  }
}
