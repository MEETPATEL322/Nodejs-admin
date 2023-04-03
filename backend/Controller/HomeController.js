// import axios, {AxiosResponse} from 'axios'
const CategoryModel = require("../Model/CategoryModel");
var categoryData = require("../categoryData.json");
const axios = require("axios");
const QratedContentModel = require("../Model/QratedContentModel");
const NewsModel = require("../Model/NewsModel");
const CmsModel = require("../Model/CmsModel");

const getCuratedContentList = async () => {
  return new Promise((resolve, reject) => {
    // console.log("qratedcontentlist")
    QratedContentModel.find()
      .limit(20)
      .exec(function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
  });
};

const getNewsData = async () => {
  return new Promise((resolve, reject) => {
    // console.log("getNewz")
    NewsModel.find()
      .limit(20)
      .exec(function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
  });
};

const getGenreMovies = (genre_id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${process.env.IMDB_API_URL}/discover/movie?api_key=${process.env.IMDB_API_KEY}&with_genres=${genre_id}`
      )
      .then((d) => {
        resolve(d.data && d.data.results ? d.data.results : []);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getActiveCategoryList = () => {
  return new Promise((resolve, reject) => {
    CategoryModel.find({ isActive: true }).exec(function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

module.exports.getHomeData = async (req, res) => {
  // console.log("fetch data..");
  try {
    const categoryData = await getActiveCategoryList();
    const curatedContentData = await getCuratedContentList();
    const newsContentData = await getNewsData();
    let homeData = [
      {
        title: "Curated Content",
        category_id: "curated-content",
        data: curatedContentData,
      },
      {
        title: "News Content",
        category_id: "news-content",
        data: newsContentData,
      },
    ];

    for (const d of categoryData) {
      let temp = { title: d.name, category_id: d.genreId };
      const movies = await getGenreMovies(d.genreId);
      temp.data = movies;
      homeData.push(temp);
    }
    // console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH",homeData)
    res.json({
      msg: "Get Home Data Successfully...",
      status: 200,
      data: homeData,
    });
  } catch (err) {
    // console.log("error meet", err);

    res.json({ msg: "Something went wrong..", status: 500, data: err });
  }
};

const getMoviesDetailTMDB = (movie_id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${process.env.IMDB_API_URL}/movie/${movie_id}?api_key=${process.env.IMDB_API_KEY}&append_to_response=reviews,similar,credits`
      )
      .then((d) => {
        resolve(d.data ? d.data : []);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports.getMovieDetail = async (req, res) => {
  // console.log("fetch data..");
  try {
    let movieId = req.params.id;
    const detailData = await getMoviesDetailTMDB(movieId);

    res.json({
      msg: "Get Movie Detail Data Successfully...",
      status: 200,
      data: detailData,
    });
  } catch (err) {
    // console.log("error", err);
    res.json({ msg: "Something went wrong..", status: 500, data: err });
  }
};
const getMoviesListTMDB = (categoryId, page) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${process.env.IMDB_API_URL}/discover/movie/?api_key=${process.env.IMDB_API_KEY}&page=${page}&with_genres=${categoryId}`
      )
      .then((d) => {
        resolve(d.data ? d.data : []);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports.getMovieList = async (req, res) => {
  // console.log("fetch data..");
  try {
    let categoryId = req.params.id;
    let page = req.query.page ? req.query.page : 1;
    const detailData = await getMoviesListTMDB(categoryId, page);

    res.json({
      msg: "Get Movie Detail Data Successfully...",
      status: 200,
      data: detailData,
    });
  } catch (err) {
    // console.log("error", err);
    res.json({ msg: "Something went wrong..", status: 500, data: err });
  }
};

//================================== get TV List ==============================================
const getTvListTMDB = (id = "", lang = "", sort_by = "", page) => {
  let URL = `${process.env.IMDB_API_URL}/discover/tv/?api_key=${process.env.IMDB_API_KEY}&page=${page}`;
  if (id != "") {
    URL += `&with_genres=${id}`;
  }
  if (lang != "") {
    URL += `&with_original_language=${lang}`;
  }
  if (sort_by != "") {
    URL += `&sort_by=${sort_by}`;
  }
  // console.log(URL);
  return new Promise((resolve, reject) => {
    axios
      .get(URL)
      .then((d) => {
        // console.log(d)
        resolve(d.data ? d.data : []);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
module.exports.getTVList = async (req, res) => {
  // console.log("fetch data tv list..");
  // try {
  let page = req.query.page ? req.query.page : 1;
  let id = req.query.id ? req.query.id : "";
  let lang = req.query.lang ? req.query.lang : "";
  let sort_by = req.query.sort_by ? req.query.sort_by : "";
  const detailData = await getTvListTMDB(id, lang, sort_by, page);
  res.json({
    msg: "Get TV Detail Data Successfully...",
    status: 200,
    data: detailData,
  });
  // } catch (err) {
  //   console.log("error", err);
  //   res.json({ msg: "Something went wrong..", status: 500, data: err });
  // }
};

//====================================== get Movie List API=====================================================
const getMoviesListsTMDB = (page) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${process.env.IMDB_API_URL}/discover/movie/?api_key=${process.env.IMDB_API_KEY}&page=${page}`
      )
      .then((d) => {
        resolve(d.data ? d.data : []);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
module.exports.getMovieLists = async (req, res) => {
  // console.log("moviesdata..");
  try {
    // let categoryId = req.params.id;
    let page = req.query.page ? req.query.page : 1;
    const detailData = await getMoviesListsTMDB(page);
    res.json({
      msg: "Get Movie List Data Successfully...",
      status: 200,
      data: detailData,
    });
  } catch (err) {
    // console.log("error", err);
    res.json({ msg: "Something went wrong..", status: 500, data: err });
  }
};

// ================================ get tv list details API===================================================
const getTVDetailTMDB = (tv_id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${process.env.IMDB_API_URL}/tv/${tv_id}?api_key=${process.env.IMDB_API_KEY}`
      )
      .then((d) => {
        resolve(d.data ? d.data : []);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
module.exports.getTVDetail = async (req, res) => {
  // console.log("fetch data.222.");
  try {
    let TVId = req.params.id;
    const detailData = await getTVDetailTMDB(TVId);
    res.json({
      msg: "Get TV Detail Data Successfully...",
      status: 200,
      data: detailData,
    });
  } catch (err) {
    // console.log("error", err);
    res.json({ msg: "Something went wrong..", status: 500, data: err });
  }
};

//==========================Get QratedContent List API===============================================
module.exports.getQratedContentList = (req, res) => {
  // console.log("qurated");
  currentPage = Number(req.query.page) ? Number(req.query.page) : 1;
  QratedContentModel.find()
    .limit(20)
    .skip(20 * (currentPage - 1))
    .exec(function (err, events) {
      QratedContentModel.find()
        .count()
        .exec(function (err, count) {
          let page = Number(req.query.page) ? Number(req.query.page) : 1;
          let totalPages = Math.ceil(count / 20);
          let totaldata = count;
          let data = {
            page: page,
            results: events,
            total_pages: totalPages,
            total_results: totaldata,
          };
          if (err) {
            res.json({ msg: "Something went wrong", status: 500, data: err });
          } else {
            res.json({
              msg: "QratedContent Data List...",
              status: 200,
              data: data,
            });
          }
        });
    });
};

//==================get QratedContent Detail Page API=======================================================
module.exports.getQratedContentDetails = async (req, res) => {
  // console.log("qurated details123..");
  try {
    let QratedContentDetailsData = await QratedContentModel.findById({
      _id: req.params.id,
    });
    // console.log(QratedContentDetailsData)
    if (QratedContentDetailsData) {
      res.json({
        msg: "Get News-Detail Data Successfully...",
        status: 200,
        data: QratedContentDetailsData,
      });
    } else {
      res.json({ msg: " News-Data Not Availablke" });
    }
  } catch (err) {
    // console.log("error", err)
    res.json({ msg: "Something went wrong..", status: 500, data: err });
  }
};
//======================================== Get News List API===============================================
module.exports.getNewsContentList = (req, res) => {
  // console.log("news data..");
  currentPage = Number(req.query.page) ? Number(req.query.page) : 1;
  NewsModel.find()
    .limit(20)
    .skip(20 * (currentPage - 1))
    .exec(function (err, events) {
      NewsModel.find()
        .count()
        .exec(function (err, count) {
          let page = Number(req.query.page) ? Number(req.query.page) : 1;
          let totalPages = Math.ceil(count / 20);
          let totaldata = count;
          let data = {
            page: page,
            results: events,
            total_pages: totalPages,
            total_results: totaldata,
          };
          if (err) {
            res.json({ msg: "Something went wrong", status: 500, data: err });
          } else {
            res.json({
              msg: "News Data List...",
              status: 200,
              data: data,
            });
          }
        });
    });
};

//==================get News Detail Page API=======================================================
module.exports.getNewsDetails = async (req, res) => {
  // console.log("news deatils123..");
  try {
    let NewsDetailsData = await NewsModel.findById({ _id: req.params.id });
    // console.log(NewsDetailsData)
    if (NewsDetailsData) {
      res.json({
        msg: "Get News-Detail Data Successfully...",
        status: 200,
        data: NewsDetailsData,
      });
    } else {
      res.json({ msg: " News-Data Not Availablke" });
    }
  } catch (err) {
    // console.log("error", err)
    res.json({ msg: "Something went wrong..", status: 500, data: err });
  }
};

//==================================get Languages API=================================================
const getLanguagesTMDB = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${process.env.IMDB_API_URL}/configuration/languages?api_key=${process.env.IMDB_API_KEY}`
      )
      .then((d) => {
        resolve(d.data ? d.data : []);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
module.exports.getLanguagesLists = async (req, res) => {
  // console.log("fetch Language12345..");
  try {
    // let categoryId = req.params.id;
    const LanguageData = await getLanguagesTMDB();
    res.json({
      msg: "Get Languages List Data Successfully...",
      status: 200,
      data: LanguageData,
    });
  } catch (err) {
    // console.log("error", err)
    res.json({ msg: "Something went wrong..", status: 500, data: err });
  }
};

//===================================get genre data API====================================================
const getGenreTMDB = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${process.env.IMDB_API_URL}/genre/movie/list?api_key=${process.env.IMDB_API_KEY}`
      )
      .then((d) => {
        resolve(d.data ? d.data : []);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
module.exports.getGenreLists = async (req, res) => {
  // console.log("fetch genre list123..");
  try {
    // let categoryId = req.params.id;
    const GenreData = await getGenreTMDB();
    res.json({
      msg: "Get Languages List Data Successfully...",
      status: 200,
      data: GenreData,
    });
  } catch (err) {
    // console.log("error", err)
    res.json({ msg: "Something went wrong..", status: 500, data: err });
  }
};

///===============================get filter data using  year and language===========================
const getFilterMovieTMDB = (year, language, genreid, sortby) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${process.env.IMDB_API_URL}/discover/movie/?api_key=${process.env.IMDB_API_KEY}&year=${year}&with_original_language=${language}&with_genres=${genreid}&sort_by=${sortby}&include_adult=false`
      )
      .then((d) => {
        resolve(d.data ? d.data : []);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
module.exports.getFilterMovieLists = async (req, res) => {
  // console.log("language api fetch filterdata..");
  try {
    // let categoryId = req.params.id;
    let d = new Date();
    let year = req.query.year ? req.query.year : d.getFullYear();
    let genreid = req.query.id;
    let language = req.query.language ? req.query.language : "en";
    let sortby = req.query.sortby ? req.query.sortby : "popularity.desc";
    const FilterData = await getFilterMovieTMDB(
      year,
      language,
      genreid,
      sortby
    );
    res.json({
      msg: "Get Filter Data Successfully...",
      status: 200,
      data: FilterData,
    });
  } catch (err) {
    // console.log("error", err)
    res.json({ msg: "Something went wrong..", status: 500, data: err });
  }
};

const getMoviesListTMDBMultiFilter = (categoryId, page, LanguageId) => {
  // console.log("data....789", categoryId, page, LanguageId)
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${process.env.IMDB_API_URL}/discover/movie/?api_key=${process.env.IMDB_API_KEY}&page=${page}&with_genres=${categoryId}&with_original_language=${LanguageId}`
      )
      .then((d) => {
        resolve(d.data ? d.data : []);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
module.exports.getMovieMultiFilterLists = async (req, res) => {
  // console.log("fetch data..12345");
  try {
    let categoryId = req.params.id;
    let LanguageId = req.params.lang;
    let page = req.query.page ? req.query.page : 1;
    // console.log('My Props',categoryId, page, LanguageId)
    const detailData = await getMoviesListTMDBMultiFilter(
      categoryId,
      page,
      LanguageId
    );

    res.json({
      msg: "Get Movie Detail Data Successfully...",
      status: 200,
      data: detailData,
    });
  } catch (err) {
    // console.log("error", err);
    res.json({ msg: "Something went wrong..", status: 500, data: err });
  }
};

const getMovieSortBy = (categoryId = 0, page = 1, sort_by = 0) => {
  let URL = `${process.env.IMDB_API_URL}/discover/movie/?api_key=${process.env.IMDB_API_KEY}&page=${page}`;
  if (categoryId != 0) {
    var regex = /^[0-9]+$/;
    if (categoryId.match(regex)) {
      URL += `&with_genres=${categoryId}`;
    } else {
      URL += `&with_original_language=${categoryId}`;
    }
  }
  // if(LanguageId != 0){
  //   URL += `&with_original_language=${LanguageId}`;
  // }
  if (sort_by != 0) {
    URL += `&sort_by=${sort_by}`;
  }
  // console.log(URL);
  return new Promise((resolve, reject) => {
    axios
      .get(URL)
      .then((d) => {
        resolve(d.data ? d.data : []);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
module.exports.getMovieSortByData = async (req, res) => {
  // console.log("fetch data..jksgjksdhgkjdfhgj");
  // console.log(req.body)
  try {
    let categoryId = req.params.id;
    let sort_by = req.params.sort_by;
    let page = req.params.page ? req.params.page : 1;
    // console.log('My Props',categoryId, page, sort_by)
    const detailData = await getMovieSortBy(categoryId, page, sort_by);

    res.json({
      msg: "Get Movie Detail Data Successfully...",
      status: 200,
      data: detailData,
    });
  } catch (err) {
    // console.log("error", err);
    // res.json({ msg: "Something went wrong..", status: 500, data: err });
  }
};

const getMovieSortByAll = (categoryId = 0, lang = 0, page = 1, sort_by = 0) => {
  let URL = `${process.env.IMDB_API_URL}/discover/movie/?api_key=${process.env.IMDB_API_KEY}&page=${page}`;
  // console.log("url",Url);
  if (categoryId != 0) {
    URL += `&with_genres=${categoryId}`;
  }
  if (lang != 0) {
    URL += `&with_original_language=${lang}`;
  }
  if (sort_by != 0) {
    URL += `&sort_by=${sort_by}`;
  }
  return new Promise((resolve, reject) => {
    axios
      .get(URL)
      .then((d) => {
        resolve(d.data ? d.data : []);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
module.exports.getMovieSortByDataAll = async (req, res) => {
  // console.log("fetch data..jksgjksdhgkjdfhgj");
  // console.log(req.body)
  try {
    let categoryId = req.params.id;
    let lang = req.params.lang;
    let sort_by = req.params.sort_by;
    let page = req.params.page ? req.params.page : 1;
    // console.log('My Props',categoryId, page, sort_by)
    const detailData = await getMovieSortByAll(categoryId, lang, page, sort_by);

    res.json({
      msg: "Get Movie Detail Data Successfully...",
      status: 200,
      data: detailData,
    });
  } catch (err) {
    // console.log("error", err);
    // res.json({ msg: "Something went wrong..", status: 500, data: err });
  }
};

// ===================================aPi For the Trailler====================================================================
// https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=<<api_key>>&language=en-US

const getMoviesVideoDetailsTMDB = (movie_id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${process.env.IMDB_API_URL}/movie/${movie_id}/videos?api_key=${process.env.IMDB_API_KEY}`
      )
     
      .then((d) => {
        
        if (d.data.results.length == 0) {
          console.log("error in finding key")
          const error ="<p>video unavailable </p>"
          resolve(error)

        }
        else{
          d.data.results.map((item) => {
            console.log("find")
            let meet = getTrailerData(item.key);
            console.log(meet)
            resolve(meet ? meet : []);
          });
        }
        // resolve(d.data ? d.data : []);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// https://www.themoviedb.org/video/play?api_key=901d089574f998daa421ef3edee1154f&key=BdJKm16Co6M&width=543&height=305&_=1675323778753
const getTrailerData = (key) => {
  console.log("key")
  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://www.themoviedb.org/video/play?api_key=${process.env.IMDB_API_KEY}&key=${key}&width=543&height=305`
      )
      .then((d) => {
        resolve(d.data ? d.data : []);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports.getMovieVideoDetail = async (req, res) => {
  // console.log("fetch data..");
  try {
    let movieId = req.params.id;
    const VideodetailData = await getMoviesVideoDetailsTMDB(movieId);
    // console.log(VideodetailData.results)

    // const key=VideodetailData.results.map(item => item.key)

    // const trailerdata=await getTrailerData(key)

    // console.log(trailerdata)
    if(VideodetailData){
      res.status(200).send(VideodetailData);

    }
    else{
      var error ="<p>video is unavailable</p>"
      res.status(500).send(error);
    }

    // res.json({
    //   msg: "Get Movie Video Detail Data Successfully...",
    //   status: 200,
    //   data: VideodetailData,
    // });
  } catch (err) {
    // console.log("error", err);
    var error ="<p>video is unavailable</p>"
    res.status(500).send(error)

  }
};

// ===================================aPi For TV the Trailler====================================================================

const getTVVideoDetailsTMDB = (tv_id) => {
  return new Promise((resolve, reject) => {
    console.log("videodetails")
    axios
      .get(
        `${process.env.IMDB_API_URL}/tv/${tv_id}/videos?api_key=${process.env.IMDB_API_KEY}`
      )
      .then((d) => {
        
        if (d.data.results.length == 0) {
          console.log("error in finding key")
          const error ="<p>video unavailable </p>"
          resolve(error)

        }
        else{
          d.data.results.map((item) => {
            console.log("find")
            let meet = getTrailerData(item.key);
            console.log(meet)
            resolve(meet ? meet : []);
          });
        }

        
         
          
        // resolve(d.data ? d.data : []);
      })
      .catch((err) => {
        reject(err);
      });
  });
};



module.exports.getTVVideoDetail = async (req, res) => {
  // console.log("fetch data..");
  
  try {
    let movieId = req.params.id;
    const VideodetailData = await getTVVideoDetailsTMDB(movieId);
    // console.log(VideodetailData.results)

    // const key=VideodetailData.results.map(item => item.key)

    // const trailerdata=await getTrailerData(key)

    // console.log(trailerdata)
    if(VideodetailData){
      res.status(200).send(VideodetailData);

    }
    else{
      var error ="<p>video is unavailable</p>"
      res.status(500).send(error);
    }
    


    // res.json({
    //   msg: "Get Movie Video Detail Data Successfully...",
    //   status: 200,
    //   data: VideodetailData,
    // });
  } catch (err) {
    // console.log("error", err);
   
    // res.json({ msg: "Something went wrong..", status: 500, data: err });
    res.status(500).send(error)
  }
};

// =================get CMS Data=============================================================================

const getCMSDataList = async () => {
  return new Promise((resolve, reject) => {
    // console.log("qratedcontentlist")
    CmsModel.find({ cmsStatus: true })
    .exec(function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

module.exports.getCMSData = async (req, res) => {
  // console.log("fetch data..");
  try {
    const CmsModel = await getCMSDataList();
    res.json({
      msg: "Get CMS Data Successfully...",
      status: 200,
      data: CmsModel,
    });
  } catch (err) {
    // console.log("error meet", err);

    res.json({ msg: "Something went wrong..", status: 500, data: err });
  }
};
