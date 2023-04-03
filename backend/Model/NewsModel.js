var mongoose = require('mongoose')

const NewsSchema = new mongoose.Schema({
    newstitle: {
        type: String,
        required: true
    },
    
    newsdescription: {
        type: String
    },
    newsimage: {
        type: String,
        // contentType: String

    }
})

const NewsModel = mongoose.model('NEWS', NewsSchema);

module.exports = NewsModel;