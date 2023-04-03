let QratedContentController = require('../Controller/QratedContentController')
let express = require('express')
let router = express.Router();
const auth=require('../middleware/auth')



//============================Routes of Curated Content==============================================================  


router.post("/Qratedcontent",auth, QratedContentController.addcontent)
router.get("/Qratedcontent",auth, QratedContentController.getcontent)
router.get("/Qratedcontent/:id",auth,QratedContentController.getoneqratedcontent)
router.delete("/Qratedcontent/:id",auth, QratedContentController.deletecontent)
router.put("/Qratedcontent/:id", auth,QratedContentController.updatecontent);





module.exports = router;