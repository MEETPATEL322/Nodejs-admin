const express = require('express')
const router = express.Router();
var HomeController = require('../Controller/HomeController')
const auth=require('../middleware/auth')

//==============================Routes of Category=======================================================================================

router.get("/get-home-data",HomeController.getHomeData);
router.get("/get-movie-detail/:id",HomeController.getMovieDetail);
router.get("/get-movie-list/:id",HomeController.getMovieList);
router.get("/get-tv-list", HomeController.getTVList);
router.get("/get-movie-list", HomeController.getMovieLists);
router.get("/get-tv-detail/:id", HomeController.getTVDetail);
router.get("/get-qrated-list", HomeController.getQratedContentList);
router.get("/get-News-list", HomeController.getNewsContentList);
router.get("/get-qrated-detail/:id", HomeController.getQratedContentDetails);
router.get("/get-News-detail/:id", HomeController.getNewsDetails);
router.get("/get-languages-data", HomeController.getLanguagesLists);
router.get("/get-genre-data", HomeController.getGenreLists);
router.get("/get-filter-data", HomeController.getFilterMovieLists);
router.get("/get-movie-list-filtered/:id/:lang",HomeController.getMovieMultiFilterLists);


router.get("/get-movie-list-all/:id/:sort_by", HomeController.getMovieSortByData);
router.get("/get-movie-list-all/:id/:lang/:sort_by", HomeController.getMovieSortByDataAll);

router.get("/get-videodetails/:id",HomeController.getMovieVideoDetail);
router.get("/get-tvvideodetails/:id",HomeController.getTVVideoDetail);
router.get("/get-cmsdata",HomeController.getCMSData);


module.exports = router;