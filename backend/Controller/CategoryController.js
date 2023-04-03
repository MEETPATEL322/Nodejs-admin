const CategoryModel = require('../Model/CategoryModel');
var categoryData = require('../categoryData.json');

// ========================ADD Category API=================================================================================

module.exports.AddCategory = (req, res) => {
    let insertData = [];
    categoryData.genres.map(genre => {
        let temp = new CategoryModel({
            name: genre.name,
            genreId: genre.id,
            isActive: true
        })
        insertData.push(temp);
    })
    // let Category = new CategoryModel({
    //     name: req.body.name,
    //     isActive: true
    // })
    CategoryModel.insertMany(insertData).then(function(){
        res.json({ msg: "Category Data Added Successfully....", status: 200 })
    }).catch(function(error){
        res.json({ msg: "Category Data failed to insert....", status: 500 })
    });

}



//===============================Get Category data=====================================================================

module.exports.getCategoryList = (req, res) => {
    var perPage = req.query.items_per_page, search = req.query.search
        , currentPage = Number(req.query.page)

    CategoryModel.find({ $or: [{ "name": new RegExp(search, 'i') }] })
        .limit(perPage)
        .skip(perPage * (currentPage - 1))
        .sort({
            name: 'asc'
        })
        .exec(function (err, events) {
            CategoryModel.find({ $or: [{ "name": new RegExp(search, 'i') }] }).count().exec(function (err, count) {
                let totalPages = Math.ceil(count / perPage);
                let from = currentPage > 1 ? ((currentPage - 1) * perPage) + 1 : 1;
                let prev_page = currentPage > 1 ? (currentPage - 1) : null;
                let next_page = currentPage < totalPages ? Number(currentPage) + 1 : null;
                let links = [
                    { url: prev_page ? "/" + prev_page : null, label: "&laquo; Previous", active: false, page: prev_page }
                ]
                for (let index = 1; index <= totalPages; index++) {
                    let temp = {
                        url: "/" + index,
                        label: index,
                        active: index == currentPage ? true : false,
                        page: index
                    }
                    links.push(temp);
                }
                links.push({ url: next_page ? "/" + next_page : null, label: "Next &raquo", active: false, page: next_page })
                let pagination = {
                    first_page_url: "/" + 1,
                    from: from,
                    to: (from + perPage) - 1 < count ? (from + perPage) - 1 : count,
                    items_per_page: perPage,
                    last_page: totalPages,
                    next_page: "/" + next_page,
                    page: currentPage,
                    prev_page: "/" + prev_page,
                    total: count,
                    links: links
                }

                if (err) {
                    res.json({ msg: "Error in Finding Category Data..", status: 404, data: err })
                }
                else {
                    res.json({
                        msg: "Category Data Find...", status: 200, data: events, payload: {
                            pagination: pagination
                        }
                    })
                }
            })
        })

}
//===============================Get Category data=====================================================================

module.exports.getCategory = (req, res) => {
    console.log("fetch data..");

    CategoryModel.find({}, function (err, data) {
        if (err) {
            res.json({ msg: "Error in Finding Category Data..", status: 404, data: err })
        }
        else {
            res.json({ msg: "Category Data Find...", status: 200, data: data })
        }
    })

}

///=======================================Get Single Category data=============================================

module.exports.getOneCategory = (req, res) => {
    CategoryModel.findOne({ _id: req.params.id }, (err, data) => {
        if (err) {
            res.json({ msg: "Error in Finding Particular Category data..", status: 404, data: err })
        }
        else {
            res.json({ msg: "Category Data Find...", status: 200, data: data })
        }
    })
}

//==================================================Update Category API=========================================================

module.exports.updateCategory = async (req, res) => {
    // const _id = req.params.id;

    let categoryInfo = await CategoryModel.findOne({ _id: req.params.id });
    if (!categoryInfo) {
        res.send("This Category Content not available in Database")
    } else {
        let reqBody = {
            name: req.body.name,
            isActive: req.body.isActive === 'true' ? true : false
        }
        console.log("reqBody====", reqBody)
        CategoryModel.updateOne({ _id: req.params.id }, reqBody, function (err, data) {
            if (err) {
                res.json({ msg: "Error in update category....", status: 404, data: err });
            }
            else {
                res.json({
                    msg: "Category data Updated....", status: 200, data: data
                })
            }
        })
    }
}

module.exports.updateMultipleCategory = async (req, res) => {
    // const _id = req.params.id;

    let categoryInfo = await CategoryModel.findOne({ _id: req.params.id });
    if (!categoryInfo) {
        res.send("This Category Content not available in Database")
    } else {
        let reqBody = {
            isActive: req.body.isActive === 'true' ? true : false
        }
        console.log("reqBody====", reqBody)
        CategoryModel.updateOne({ _id: req.params.id }, reqBody, function (err, data) {
            if (err) {
                res.json({ msg: "Error in update category....", status: 404, data: err });
            }
            else {
                res.json({
                    msg: "Category data Updated....", status: 200, data: data
                })
            }
        })
    }
}