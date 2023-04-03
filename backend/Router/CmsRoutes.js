const express = require("express")
const router = express.Router();
const CmsController = require("../Controller/CmsController")
const auth = require('../middleware/auth')


router.get("/cms", (req, res) => {
    res.send("hello welcome to cms list page")
})

router.post("/cms", auth, CmsController.AddCmsDetails)
router.get("/cms", auth, CmsController.getCmsdata)
router.get("/cms/:id", auth, CmsController.getsingleCmsdata)
router.delete("/cms/:id", auth, CmsController.deleteCmsdata)
router.put("/cms/:id", auth, CmsController.updatCmsdata)

router.get("/cms-list", auth,CmsController.getCmsdata);

// new code..
router.post("/addeditorimagecms", CmsController.AddEditorImageCms);

module.exports = router;
