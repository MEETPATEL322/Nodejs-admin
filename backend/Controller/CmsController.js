let CmsModel = require("../Model/CmsModel");
//===================================multer for image upload==================================================================================
var multer = require("multer");

//multer storage...
var Storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname + "-" + Date.now() + ".jpg");
  },
});
const upload = multer({ storage: Storage }).single("cmsimage");
//================================================Add CMSData API==========================================================
module.exports.AddCmsDetails = async (req, res) => {
  console.log("add cms........",req.body);
  try {
    let Cmsdata = new CmsModel({
      cmsTitle: req.body.cmsTitle,
      cmsDescription: req.body.cmsDescription,
      cmsStatus: req.body.cmsStatus,
    });
    let Cmscontent = await Cmsdata.save();
    if (Cmscontent) {
      res
        .status(201)
        .send({
          message: "Cmsdata Added..........",
          status: "Created",
          data: Cmscontent,
        });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({
        message: "Error in Cmsdata Adding.......",
        status: "Not Found",
        data: err,
      });
  }
};

// new code
module.exports.AddEditorImageCms = (req, res) => {
  console.log("cms");
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

//================================================Get CmsData API=====================================================
module.exports.getCmsdata = (req, res) => {
  console.log("fetch cmsdata..");
  let perPage = Number(req.query.items_per_page);
  let search = req.query.search;
  let currentPage = Number(req.query.page);
  CmsModel.find({
    $or: [
      { cmsTitle: new RegExp(search, "i") },
      { cmsDescription: new RegExp(search, "i") },
    ],
  })
    .skip(perPage * (currentPage - 1))
    .limit(perPage)
    .sort({
      _id: -1,
    })
    .exec(function (err, data) {
      CmsModel.find({
        $or: [
          { cmsTitle: new RegExp(search, "i") },
          { cmsDescription: new RegExp(search, "i") },
        ],
      })
        .count()
        .exec(function (err, count) {
          let totalPages = Math.ceil(count / perPage);
          let from = currentPage > 1 ? (currentPage - 1) * perPage + 1 : 1;
          let prev_page = currentPage > 1 ? currentPage - 1 : null;
          let next_page =
            currentPage < totalPages ? Number(currentPage) + 1 : null;

          let links = [
            {
              url: prev_page ? "/" + prev_page : null,
              label: "&laquo; Previous",
              active: false,
              page: prev_page,
            },
          ];
          for (index = 1; index <= totalPages; index++) {
            let temp = {
              url: "/" + index,
              label: index,
              active: index == currentPage ? true : false,
              page: index,
            };
            links.push(temp);
          }
          links.push({
            url: next_page ? "/" + next_page : null,
            label: "Next &raquo",
            active: false,
            page: next_page,
          });
          let pagination = {
            first_page_url: "/" + 1,
            from: from,
            to: from + perPage - 1 < count ? from + perPage - 1 : count,
            items_per_page: perPage,
            last_page: totalPages,
            next_page: "/" + next_page,
            prev_page: "/" + prev_page,
            total: count,
            page: currentPage,
            links: links,
          };
          if (err) {
            res
              .status(404)
              .send({
                message: "Error in Finding CmsData...",
                status: "Not Found",
                data: err,
              });
          } else {
            res.status(200).send({
              message: "CmsData Finded.....",
              status: "Success",
              data: data,
              payload: {
                pagination: pagination,
              },
            });
          }
        });
    });
};

//=============================Get single-Cmsdata====================================================================

module.exports.getsingleCmsdata = async (req, res) => {
  try {
    let Cmsdata = await CmsModel.findById({ _id: req.params.id });
    if (Cmsdata) {
      res
        .status(200)
        .send({
          message: "Cmsdata Finded..........",
          status: "Success",
          data: Cmsdata,
        });
    } else {
      res
        .status(400)
        .send({
          message: "Cmsdata Not Exist..............",
          status: "Bad request",
        });
    }
  } catch (err) {
    res
      .status(404)
      .send({
        message: "Error in Cmsdata Finding.......",
        status: "Not Found",
        data: err,
      });
  }
};
//===============================================Delete Cmsdata API===================================================
module.exports.deleteCmsdata = async (req, res) => {
  try {
    let deletedata = await CmsModel.findByIdAndDelete({ _id: req.params.id });
    if (deletedata) {
      res
        .status(200)
        .send({
          message: "Cmsdata Deleted..........",
          status: "Success",
          data: deletedata,
        });
    } else {
      res
        .status(400)
        .send({
          message: "Cmsdata Not Exist..........",
          status: "Bad Request",
        });
    }
  } catch (err) {
    res
      .status(404)
      .send({
        message: "Error in deleting Cmsdata.......",
        status: "Not Found",
        data: err,
      });
  }
};

//============================================================Update CMSdata API==========================================
module.exports.updatCmsdata = async (req, res) => {
  // const _id = req.params.id;
console.log("update data.......");
  let cmsInfo = await CmsModel.findOne({ _id: req.params.id });
  if (!cmsInfo) {
      res.send("This Category Content not available in Database")
  } else {
      let reqBody = {
        cmsTitle: req.body.cmsTitle,
        cmsDescription: req.body.cmsDescription,
        cmsStatus: req.body.cmsStatus === 'true' ? true : false
      }
      console.log("reqBody====", reqBody)
      CmsModel.updateOne({ _id: req.params.id }, reqBody, function (err, data) {
          if (err) {
              res.json({ msg: "Error in update category....", status: 404, data: err });
          }
          else {
              res.json({
                  msg: "Category data Updated....", status: 200, data: data
              })
          }
      })
  }
}
