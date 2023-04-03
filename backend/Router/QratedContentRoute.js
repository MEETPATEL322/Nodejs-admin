const express = require('express')
const router = express.Router();
var QratedContentController = require('../Controller/QratedContentController')
const auth=require('../middleware/auth')

//==============================Routes of News=======================================================================================

router.post("/qrated-content",auth, QratedContentController.AddQratedContent);
router.get("/qrated-content", auth,QratedContentController.getQratedContent);
router.get("/qrated-content/:id",auth,QratedContentController.getOneQratedContent)
router.delete("/qrated-content/:id",auth, QratedContentController.deleteQratedContent)
router.put("/qrated-content/:id",auth, QratedContentController.updateQratedContent)

router.get("/qrated-content-list", auth,QratedContentController.getQratedContentList);

// new code..
router.post("/addeditorimagequrated", QratedContentController.AddEditorImageQurated);

module.exports = router;