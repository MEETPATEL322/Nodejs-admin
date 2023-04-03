var mongoose = require('mongoose');


var QratedContentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    description: {
        type: String

    }

})


var QratedContentModel = mongoose.model('QratedContent', QratedContentSchema);

module.exports = QratedContentModel