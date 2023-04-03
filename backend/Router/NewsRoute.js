const express = require('express')
const router = express.Router();
var NewsController = require('../Controller/NewsController')
const auth=require('../middleware/auth')

//==============================Routes of News=======================================================================================

router.post("/news",auth, NewsController.AddNews);
// image upload
router.post("/addeditorimage", NewsController.AddEditorImage);
router.get("/news", auth,NewsController.getnews);
router.get("/news/:id",auth,NewsController.getonenews)
router.delete("/news/:id",auth, NewsController.deletenews)
router.put("/news/:id",auth, NewsController.updatenews)

router.get("/news-list", auth,NewsController.getNewsList);



module.exports = router;