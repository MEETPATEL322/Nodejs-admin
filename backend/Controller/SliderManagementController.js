const SliderManagementModel = require("../Model/SliderManagementModel");
const path = require("path");
const fs = require("fs");

//===================================multer for image upload==================================================================================
var multer = require("multer");

//multer storage...
var Storage = multer.diskStorage({
  destination: "uploads/SliderManagement",
  filename: (req, file, cb) => {
    cb(null, file.originalname + "-" + Date.now() + ".jpg");
  },
});
const upload = multer({ storage: Storage }).single("image");

// ========================ADD News API=================================================================================

module.exports.AddSliderManagementData = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
    } else {
      let SliderData = new SliderManagementModel({
        image: req.file.filename,
        title:req.body.title,
        description:req.body.description,
        Status: req.body.Status
      });
      SliderData.save(function (err, data) {
        if (err) {
          throw err;
        } else {
          res.json({
            msg: "SliderManagement Data Added Successfully....",
            status: 200,
            data: data,
          });
        }
      });
    }
  });
};


//===============================Get Slider data=====================================================================

module.exports.getSliderManagementList = (req, res) => {
    var perPage = req.query.items_per_page, search = req.query.search
        , currentPage = Number(req.query.page)

        SliderManagementModel.find({ $or: [{ "title": new RegExp(search, 'i') }, { "description": new RegExp(search, 'i') }] })
        .limit(perPage)
        .skip(perPage * (currentPage - 1))
        .sort({
            _id:-1
        })
        .exec(function (err, events) {
            SliderManagementModel.find({ $or: [{ "title": new RegExp(search, 'i') }, { "description": new RegExp(search, 'i') }] }).count().exec(function (err, count) {
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
              msg: "Error in Finding SliderManagementData..",
              status: 404,
              data: err,
            });
          } else {
            res.json({
              msg: "SliderManagement Data Find...",
              status: 200,
              data: events,
              payload: {
                pagination: pagination,
              },
            });
          }
        });
    });
 
};

// ===============================================get all slider Data=======================================================================
module.exports.getSliderManagementData = (req, res) => {
   
  
    SliderManagementModel.find({}, function (err, data) {
      if (err) {
        res.json({ msg: "Error in Finding SliderManagementData..", status: 404, data: err });
      } else {
        res.json({ msg: "SliderManagement Data Find...", status: 200, data: data });
      }
    });
  };
  


//   =======================================Delete SliderManagement Data========================================================================

  module.exports.deleteslidermanagementData = async (req, res) => {
    let sliderinfo = await SliderManagementModel.findOne({ _id: req.params.id });
    if (!sliderinfo) {
      res.send("This slidermanagement data not available in Database");
    } else {
      let sliderimage = sliderinfo.image;
     
      if (sliderimage) {
        let path = "uploads/SliderManagement/" + sliderimage;
        console.log("SliderManagement==",path)

        if (fs.existsSync(path)) {
          // path exists
          fs.unlinkSync(path);
          console.log("exists:", "uploads/SliderManagement/" + sliderimage);
        } else {
          console.log("DOES NOT exist:", "uploads/SliderManagement/" + sliderimage);
        }
      }
  
      SliderManagementModel.deleteOne({ _id: req.params.id }, function (err, data) {
        if (err) {
          res.json({ msg: "Error in delete SliderManagementData....", status: 404, data: err });
        } else {
          res.json({
            msg: "SliderManagement  data deleted....",
            status: 200,
            data: data,
          });
        }
      });
    }
  };
  

  //==================================================Update Status API=========================================================

module.exports.updateStatus = async (req, res) => {
    // const _id = req.params.id;

    let updateStatusInfo = await SliderManagementModel.findOne({ _id: req.params.id });

    // console.log(updateStatusInfo)
    if (!updateStatusInfo) {
        res.send("This sliedrmanagement Content not available in Database")
    } else {
        let reqBody = {
            
            Status: req.body.Status 
        }
        console.log("reqBody====", reqBody)
        SliderManagementModel.updateOne({ _id: req.params.id }, reqBody, function (err, data) {
            if (err) {
                res.json({ msg: "Error in update slidermanagement status....", status: 404, data: err });
            }
            else {
                res.json({
                    msg: "Slidermanagement status  Updated....", status: 200, data: data
                })
            }
        })
    }
}
