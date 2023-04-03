const QratedContentModel = require('../Model/QratedContentModel')
var multer = require('multer')
var fs = require('fs')

var Storage = multer.diskStorage({
    destination: "uploads/qratedcontent",
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
})
var upload = multer({ storage: Storage }).array('img2');



///==================================== Add Curated content api==========================================================

module.exports.addcontent = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log("error")

        }
        else {
            let qratedcontent = new QratedContentModel({
                title: req.body.title,
                image: {
                    data: req.files.map(item => item.filename),
                    contentType: 'image/png'
                },
                desc: req.body.description

            })

            qratedcontent.save(function (err, data) {
                if (err) {
                    throw err
                }
                else {
                    res.json({ msg: "QratedContent Added Successfully....", status: 200, data: data })
                }


            })

        }
    })



}

///========================================Get Qrated all content api==============================================

module.exports.getcontent = (req, res) => {

    QratedContentModel.find({}, function (err, data) {
        if (err) {
            res.json({ msg: "Error in Finding QratedContent..", status: 404, data: err })
        }
        else {
            res.json({ msg: "QratedContent Data Find...", status: 200, data: data })
        }
    })

}

///========================Get Qrated Single content data api===============================================


module.exports.getoneqratedcontent = (req, res) => {

    QratedContentModel.findOne({ _id: req.params.id }, (err, data) => {
        if (err) {
            res.json({ msg: "Error in Finding Single QratedContent", status: 404, data: err })
        }
        else {
            res.json({ msg: "QratedContent Data Find...", status: 200, data: data })
        }

    })

}

//==============================================  Delete Curated content api==========================================

module.exports.deletecontent = async (req, res) => {

    let qratedcontentinfo = await QratedContentModel.findOne({ _id: req.params.id });
    let qratedcontentimage = qratedcontentinfo.image

    if (qratedcontentimage) {
        // fs.unlinkSync("uploads/qratedcontent/" + qratedcontentimage.data)
        qratedcontentimage.data.map(item => { fs.unlinkSync("uploads/qratedcontent/" + item) })
    }

    QratedContentModel.deleteOne({ _id: req.params.id }, function (err, data) {
        if (err) {
            res.json({ msg: "Error in Deleting QratedContent..", status: 404, data: err })
        }
        else {
            res.json({ msg: "QratedContent Data Deleted...", status: 200, data: data })
        }

    })

}




//============================================Update Qratedcontent api==============================================


module.exports.updatecontent = async (req, res) => {

    let qratedcontentinfo = await QratedContentModel.findOne({ _id: req.params.id })
    let qratedcontentimage = qratedcontentinfo.image;
    console.log(qratedcontentimage)
    if (qratedcontentimage) {
        // fs.unlinkSync('uploads/qratedcontent/' + qratedcontentimage.data)
        qratedcontentimage.data.map(item => { fs.unlinkSync("uploads/qratedcontent/" + item) })
    }

    upload(req, res, (err) => {

        let reqBody = {
            title: req.body.title,
            image: {
                data: req.files.map(item => item.filename),
                contentType: 'image/png',
            },
            desc: req.body.description

        }

        QratedContentModel.updateOne({ _id: req.params.id }, reqBody, function (err, data) {
            if (err) {
                res.json({ msg: "Error in Updating QratedContent..", status: 404, data: err })


            } else {
                res.json({ msg: "QratedContent Data Updated...", status: 200, data: data })
            }
        }

        )
    }

    )


}