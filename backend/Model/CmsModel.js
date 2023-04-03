const mongoose = require("mongoose");

const CmsSchema = new mongoose.Schema({
    cmsTitle: {
        type: String,
        required: true
    },
    cmsDescription: {
        type: String,
        required: true
    },
    cmsStatus: {
        type: Boolean,
        required: true,
        // lowercase: true

    }
})


const CmsModel = mongoose.model("CMSDETAIL", CmsSchema)
module.exports = CmsModel