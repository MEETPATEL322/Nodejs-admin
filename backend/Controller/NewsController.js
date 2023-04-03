const NewsModel = require("../Model/NewsModel");
const path = require("path");
const fs = require("fs");

//===================================multer for image upload==================================================================================
var multer = require("multer");

//multer storage...
var Storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname + "-" + Date.now() + ".jpg");
  },
});
const upload = multer({ storage: Storage }).single("newsimage");

// ========================ADD News API=================================================================================

module.exports.AddNews = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
    } else {
      let News = new NewsModel({
        newstitle: req.body.newstitle,
        newsimage: req.file.filename,
        newsdescription: req.body.newsdescription,
      });
      News.save(function (err, data) {
        if (err) {
          throw err;
        } else {
          res.json({
            msg: "News Data Added Successfully....",
            status: 200,
            data: data,
          });
        }
      });
    }
  });
};

// new code
module.exports.AddEditorImage = (req, res) => {
  upload(req, res, (err) => {
    //  console.log(req);
    if (err) {
      console.log(err);
    } else {
    
      // if (req.files.length > 0) {
        console.log(req.file.filename)
         res.json({"filename": req.file.filename});

      // }
    //   let News = new NewsModel({
    //     newstitle: req.body.newstitle,
    //     newsimage: req.file.filename,
    //     newsdescription: req.body.newsdescription,
    //   });
    //   News.save(function (err, data) {
    //     if (err) {
    //       throw err;
    //     } else {
    //       res.json({
    //         msg: "News Data Added Successfully....",
    //         status: 200,
    //         data: data,
    //       });
    //     }
    //   });
    }
  });
};

//===============================Get News data=====================================================================

module.exports.getNewsList = (req, res) => {
    var perPage = req.query.items_per_page, search = req.query.search
        , currentPage = Number(req.query.page)

    NewsModel.find({ $or: [{ "newstitle": new RegExp(search, 'i') }, { "newsdescription": new RegExp(search, 'i') }] })
        .limit(perPage)
        .skip(perPage * (currentPage - 1))
        .sort({
            _id:-1
        })
        .exec(function (err, events) {
            NewsModel.find({ $or: [{ "newstitle": new RegExp(search, 'i') }, { "newsdescription": new RegExp(search, 'i') }] }).count().exec(function (err, count) {
                let totalPages = Math.ceil(count / perPage);
                let from = currentPage > 1 ? ((currentPage - 1) * perPage) + 1 : 1;
                let prev_page = currentPage > 1 ? (currentPage - 1) : null;
                let next_page = currentPage < totalPages ? Number(currentPage) + 1 : null;
                let links = [
                    { url: prev_page ? "/" + prev_page : null, label: "&laquo; Previous", active: false, page: prev_page }
                ]
                for (let index = 1; index <= totalPages; index++) {
                    let temp = {
                        url: "/" + index,
                        label: index,
                        active: index == currentPage ? true : false,
                        page: index
                    }
                    links.push(temp);
                }
                links.push({ url: next_page ? "/" + next_page : null, label: "Next &raquo", active: false, page: next_page })
                let pagination = {
                    first_page_url: "/" + 1,
                    from: from,
                    to: (from + perPage) - 1 < count ? (from + perPage) - 1 : count,
                    items_per_page: perPage,
                    last_page: totalPages,
                    next_page: "/" + next_page,
                    page: currentPage,
                    prev_page: "/" + prev_page,
                    total: count,
                    links: links
                }

          if (err) {
            res.json({
              msg: "Error in Finding NewsData..",
              status: 404,
              data: err,
            });
          } else {
            res.json({
              msg: "News Data Find...",
              status: 200,
              data: events,
              payload: {
                pagination: pagination,
              },
            });
          }
        });
    });
  // NewsModel.find({}, function (err, data) {
  //     if (err) {
  //         res.json({ msg: "Error in Finding NewsData..", status: 404, data: err })
  //     }
  //     else {
  //         res.json({ msg: "News Data Find...", status: 200, data: data, payload : { test : "test"} })
  //     }
  // })
};
//===============================Get News data=====================================================================

module.exports.getnews = (req, res) => {
  console.log("fetch data..");

  NewsModel.find({}, function (err, data) {
    if (err) {
      res.json({ msg: "Error in Finding NewsData..", status: 404, data: err });
    } else {
      res.json({ msg: "News Data Find...", status: 200, data: data });
    }
  });
};

///=======================================Get Single news data=============================================

module.exports.getonenews = (req, res) => {
  NewsModel.findOne({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.json({
        msg: "Error in Finding Particular Newsdata..",
        status: 404,
        data: err,
      });
    } else {
      res.json({ msg: "News Data Find...", status: 200, data: data });
    }
  });
};

//=====================================================Delete News API==================================================

module.exports.deletenews = async (req, res) => {
  let newsinfo = await NewsModel.findOne({ _id: req.params.id });
  if (!newsinfo) {
    res.send("This news not available in Database");
  } else {
    let newsimage = newsinfo.newsimage;
    if (newsimage) {
      let path = "uploads/" + newsimage.data;
      if (fs.existsSync(path)) {
        // path exists
        fs.unlinkSync(path);
        console.log("exists:", "uploads/" + newsimage.data);
      } else {
        console.log("DOES NOT exist:", "uploads/" + newsimage.data);
      }
    }

    NewsModel.deleteOne({ _id: req.params.id }, function (err, data) {
      if (err) {
        res.json({ msg: "Error in delete news....", status: 404, data: err });
      } else {
        res.json({
          msg: "News data deleted....",
          status: 200,
          data: data,
        });
      }
    });
  }
};

//==================================================Update News API=========================================================

module.exports.updatenews = async (req, res) => {
  // const _id = req.params.id;

  let newsinfo = await NewsModel.findOne({ _id: req.params.id });
  if (!newsinfo) {
    res.send("This News Content not available in Database");
  } else {
    let newsimage = newsinfo.newsimage;
    if (req.newsimage) {
      fs.unlinkSync("./uploads/" + newsimage);
      // newsimage.data.map(item => { fs.unlinkSync("uploads/" + item) })
    }

    upload(req, res, (err) => {
      if (err) {
        console.log(err);
      } else {
        let reqBody = {
          newstitle: req.body.newstitle,

          newsimage:
            req.file && req.file.filename ? req.file.filename : newsimage,
          newsdescription: req.body.newsdescription,
        };
        // console.log(reqBody)
        NewsModel.updateOne(
          { _id: req.params.id },
          reqBody,
          function (err, data) {
            if (err) {
              res.json({
                msg: "Error in update news....",
                status: 404,
                data: err,
              });
            } else {
              res.json({
                msg: "News data Updated....",
                status: 200,
                data: data,
              });
            }
          }
        );
      }
    });
  }
};
