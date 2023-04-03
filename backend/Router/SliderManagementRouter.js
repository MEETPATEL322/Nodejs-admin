const express = require('express')
const router = express.Router();
const SliderManagementController=require('../Controller/SliderManagementController')
const auth=require('../middleware/auth')

//==============================Routes of News=======================================================================================

router.post("/slidermanagement", SliderManagementController.AddSliderManagementData);
router.get("/slidermanagement-list", SliderManagementController.getSliderManagementList);

router.get("/slidermanagement", SliderManagementController.getSliderManagementData);
router.delete("/slidermanagement/:id", SliderManagementController.deleteslidermanagementData)
router.put("/slidermanagement/:id", SliderManagementController.updateStatus)


module.exports = router;