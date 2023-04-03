const express = require('express')
const router = express.Router();
var CategoryController = require('../Controller/CategoryController')
const auth=require('../middleware/auth')

//==============================Routes of Category=======================================================================================

router.post("/category",auth, CategoryController.AddCategory);
router.put("/category-update/:id",auth, CategoryController.updateMultipleCategory);
router.get("/category", auth,CategoryController.getCategory);
router.get("/category/:id",auth,CategoryController.getOneCategory)
router.put("/category/:id",auth, CategoryController.updateCategory)

router.get("/category-list", auth,CategoryController.getCategoryList);

module.exports = router;