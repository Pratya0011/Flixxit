import content from "../../model/contentList.js";

export const searchContent = async (req, res) => {
  try {
    let { name } = req.query;
    name==='Taare Zameen Par'?name='Like Stars on Earth':name
    const regex = new RegExp(name, "i");
    const result = await content.find({
      $or: [{ name: { $regex: regex } }, { title: { $regex: regex } }],
    });
    if (!result) {
      res.send({
        status: 401,
        message: "No such content",
      });
    } else {
      res.send({
        statue: 200,
        result:result
      });
    }
  } catch (err) {
    res.send({
      status: 500,
      msg: "Internal server Error",
      err: err.name,
    });
  }
};
