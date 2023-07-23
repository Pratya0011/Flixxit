import content from "../model/contentList.js";
import { movieList,tvList } from "./fetchData.js";
import connection from "../db/index.js";


const storeCollection = async () => {
  try {
    await connection;
    const movies = await movieList();
    const tv =await tvList();
    const totalCollection =[...movies,...tv]
    await content.create(totalCollection);
    console.log("Movies uploaded to db");
  } catch (err) {
    throw err;
  }
};
storeCollection();

