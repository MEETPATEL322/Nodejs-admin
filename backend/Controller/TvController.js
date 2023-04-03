const CategoryModel = require("../Model/CategoryModel");
var categoryData = require("../categoryData.json");
const axios = require("axios");

//===================================get genre data API====================================================
const getGenreTvListTMDB = () => {
  // console.log("tv list");
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${process.env.IMDB_API_URL}/genre/tv/list?api_key=${process.env.IMDB_API_KEY}`,
        {
          headers: { "Accept-Encoding": "gzip,deflate,compress" },
        }
      )
      .then((d) => {
        resolve(d.data ? d.data : []);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
module.exports.getGenreTvLists = async (req, res) => {
  console.log("fetch genre list123..");
  try {
    // let categoryId = req.params.id;
    const GenreTvData = await getGenreTvListTMDB();
    res.json({
      msg: "Get Languages List Data Successfully...",
      status: 200,
      data: GenreTvData,
    });
  } catch (err) {
    console.log("error", err);
    res.json({ msg: "Something went wrong..", status: 500, data: err });
  }
};

// ======================================get genre detail page API==========================================

const getFilterTvTMDB = (year, language, genreid, sortby) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${process.env.IMDB_API_URL}/discover/movie/?api_key=${process.env.IMDB_API_KEY}&year=${year}&with_original_language=${language}&with_genres=${genreid}&sort_by=${sortby}&include_adult=false`, { 
            headers: { "Accept-Encoding": "gzip,deflate,compress" } 
        }
      )
      .then((d) => {
        resolve(d.data ? d.data : []);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
module.exports.getFilterTvLists = async (req, res) => {
  console.log("filter tv details page123..");
  try {
    // let categoryId = req.params.id;
    let d = new Date();
    let year = req.query.year ? req.query.year : d.getFullYear();
    let genreid = req.query.id;
    let language = req.query.language ? req.query.language : "en";
    let sortby = req.query.sortby ? req.query.sortby : "popularity.desc";
    const FilterData = await getFilterTvTMDB(year, language, genreid, sortby);
    res.json({
      msg: "Get Filter Data Successfully...",
      status: 200,
      data: FilterData,
    });
  } catch (err) {
    console.log("error", err);
    res.json({ msg: "Something went wrong..", status: 500, data: err });
  }
};

//==================================get Language data API=================================================

const getLanguagesTvTMDB = () => {
  // console.log("tv language..");
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${process.env.IMDB_API_URL}/configuration/languages?api_key=${process.env.IMDB_API_KEY}`, { 
            headers: { "Accept-Encoding": "gzip,deflate,compress" } 
        }
      )
      .then((d) => {
        resolve(d.data ? d.data : []);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
module.exports.getLanguagesTvLists = async (req, res) => {
  // console.log("fetch Language12345..");
  try {
    // let categoryId = req.params.id;
    const LanguageData = await getLanguagesTvTMDB();
    res.json({
      msg: "Get Languages List Data Successfully...",
      status: 200,
      data: LanguageData,
    });
  } catch (err) {
    console.log("error", err);
    res.json({ msg: "Something went wrong..", status: 500, data: err });
  }
};
