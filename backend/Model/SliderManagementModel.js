var mongoose = require('mongoose')

const SliderSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    
    description: {
        type: String
    },
   
   
    image: {
        type: String,
        // contentType: String

    },
    Status: {
        type: Boolean,
        required: true,
    }
})

const SliderModel = mongoose.model('SLIDERMANAGEMENT', SliderSchema);

module.exports = SliderModel;