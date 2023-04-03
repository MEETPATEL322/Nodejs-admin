const QratedContentModel = require('../Model/QratedContentModel');
const path = require('path');
const fs = require('fs')


//===================================multer for  image upload==================================================================================
var multer = require('multer');


//multer storage...
var Storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, file.originalname + "-" + Date.now()+".jpg")
    }
})
const upload = multer({ storage: Storage }).single('image')



// ========================ADD QratedContent API=================================================================================

module.exports.AddQratedContent = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            let QratedContent = new QratedContentModel({
                title: req.body.title,
                image: req.file.filename,
                description: req.body.description,
            })
            QratedContent.save(function (err, data) {
                if (err) {
                    throw err
                }
                else {
                    res.json({ msg: "Curated Content Data Added Successfully....", status: 200, data: data })
                }
            })

        }
    })

}

// New code..
module.exports.AddEditorImageQurated = (req, res) => {
    console.log("qurated content")
    upload(req, res, (err) => {
      //  console.log(req);
      if (err) {
        console.log(err);
      } else {
      
        // if (req.files.length > 0) {
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


//===============================Get QratedContent data=====================================================================

module.exports.getQratedContentList = (req, res) => {
    var perPage = req.query.items_per_page, search = req.query.search
        , currentPage = Number(req.query.page);

    QratedContentModel.find({ $or: [{ "title": new RegExp(search, 'i') }, { "description": new RegExp(search, 'i') }] })
        .limit(perPage)
        .skip(perPage * (currentPage - 1))
        .sort({
            _id: -1
        })
        .exec(function (err, events) {
            QratedContentModel.find({ $or: [{ "title": new RegExp(search, 'i') }, { "description": new RegExp(search, 'i') }] }).count().exec(function (err, count) {
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
                    res.json({ msg: "Error in Finding QratedContentData..", status: 404, data: err })
                }
                else {
                    res.json({
                        msg: "QratedContent Data Find...", status: 200, data: events, payload: {
                            pagination: pagination
                        }
                    })
                }
            })
        })
    // QratedContentModel.find({}, function (err, data) {
    //     if (err) {
    //         res.json({ msg: "Error in Finding QratedContentData..", status: 404, data: err })
    //     }
    //     else {
    //         res.json({ msg: "QratedContent Data Find...", status: 200, data: data, payload : { test : "test"} })
    //     }
    // })

}
//===============================Get QratedContent data=====================================================================

module.exports.getQratedContent = (req, res) => {
    console.log("fetch data..");

    QratedContentModel.find({}, function (err, data) {
        if (err) {
            res.json({ msg: "Error in Finding QratedContentData..", status: 404, data: err })
        }
        else {
            res.json({ msg: "QratedContent Data Find...", status: 200, data: data })
        }
    })

}

///=======================================Get Single Curated Content data=============================================

module.exports.getOneQratedContent = (req, res) => {
    QratedContentModel.findOne({ _id: req.params.id }, (err, data) => {
        if (err) {
            res.json({ msg: "Error in Finding Particular Curated Content data..", status: 404, data: err })
        }
        else {
            res.json({ msg: "QratedContent Data Find...", status: 200, data: data })
        }
    })
}




//=====================================================Delete QratedContent API==================================================


module.exports.deleteQratedContent = async (req, res) => {

    let qratedContentinfo = await QratedContentModel.findOne({ _id: req.params.id });
    if (!qratedContentinfo) {
        res.send("This Curated Content not available in Database")
    } else {
        let image = qratedContentinfo.image
        if (image) {
            let path = "uploads/" + image;
            if (fs.existsSync(path)) {
                // path exists
                fs.unlinkSync(path)
                console.log("exists:", "uploads/" + image);
            } else {
                console.log("DOES NOT exist:", "uploads/" + image);
            }
        }

        QratedContentModel.deleteOne({ _id: req.params.id }, function (err, data) {
            if (err) {
                res.json({ msg: "Error in delete curated content....", status: 404, data: err });
            }

            else {
                res.json({
                    msg: "Curated Content data deleted....", status: 200, data: data
                })
            }

        })
    }
}




//==================================================Update QratedContent API=========================================================

module.exports.updateQratedContent = async (req, res) => {
    // const _id = req.params.id;

    let qratedContentinfo = await QratedContentModel.findOne({ _id: req.params.id });
    if (!qratedContentinfo) {
        res.send("This QratedContent Content not available in Database")
    } else {
        let image = qratedContentinfo.image
        if (req.image) {
            fs.unlinkSync('./uploads/' + image)
            // image.map(item => { fs.unlinkSync("uploads/" + item) })
        }

        upload(req, res, (err) => {
            if (err) {
                console.log(err)
            }
            else {
                let reqBody = {
                    title: req.body.title,

                    image: req.file && req.file.filename ? req.file.filename : image,
                    description: req.body.description
                }
                // console.log(reqBody)
                QratedContentModel.updateOne({ _id: req.params.id }, reqBody, function (err, data) {
                    if (err) {
                        res.json({ msg: "Error in update curated content....", status: 404, data: err });
                    }
                    else {
                        res.json({
                            msg: "Curated Content data Updated....", status: 200, data: data
                        })
                    }

                })

            }
        })
    }
}