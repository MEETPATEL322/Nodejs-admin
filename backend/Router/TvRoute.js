const express = require('express')
const router = express.Router();
var TvController = require('../Controller/TvController')
const auth=require('../middleware/auth')


// ===============================Tv Routes=================================

router.get("/get-tvgenre-data", TvController.getGenreTvLists);
router.get("/get-filter-tv-data", TvController.getFilterTvLists);

router.get("/get-tvlanguages-data", TvController.getLanguagesTvLists);



module.exports = router;