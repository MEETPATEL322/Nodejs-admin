var mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    genreId: {
        type: Number
    },    
    isActive: {
        type: Boolean
    }
})

const CategoryModel = mongoose.model('CATEGORY', CategorySchema);

module.exports = CategoryModel;