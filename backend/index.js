const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const UserRoute = require("./Router/UserRoute");
const NewsRoute = require("./Router/NewsRoute");
const QratedContentRoute = require("./Router/QratedContentRoute");
const CategoryRoute = require("./Router/CategoryRoute");
const CmsRoutes = require("./Router/CmsRoutes");
const HomeRoute = require("./Router/HomeRoute");
const TvRoute = require("./Router/TvRoute");
const path = require('path');

const SliderManagementRouter=require('./Router/SliderManagementRouter')

var app = express();
app.use(express.static("uploads"));
app.use(express.static("uploads/qratedcontent"));
app.use(express.static(path.resolve(__dirname, '../frontend/build')));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const cors = require("cors");
app.use(cors());

app.get("/api", (req, res) => {
  res.send("welcome to home page");
});

//========================================using user troutes===================================================================
app.use("/", UserRoute);

//============================================using NewsRoutes===================================================================
app.use("/api", NewsRoute);

//============================================using Curated content routes===================================================
app.use("/api", QratedContentRoute);
//============================================using Category routes===================================================
app.use("/api", CategoryRoute);

//============================================using Category routes===================================================
app.use("/api", HomeRoute);

//=============================================using tv route ============================================
app.use("/api", TvRoute);

//==================================================using CMSroutes====================================================

app.use("/api", CmsRoutes);
// ============================================slider Managemnet route===================================

app.use("/api",SliderManagementRouter );

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
});

//===================================Database Connection=====================================================================
mongoose.set('strictQuery', false)
// const mongodb = context.services.get("mongodb-atlas");
// const movies = mongodb.db("stitch").collection("movies");

mongoose.connect(process.env.MONGO_URL, (err) => {
  if (err) {
    console.log("Failed to Connect with Database");
  } else {
    console.log("Database Connected Successfully");
  }
});

// Creating Nodejs API ====> Delete and Update API for NewsContent and  Create,read,update,delete  of QratedContent API  in nodejs

//==========================================server created==================================================================
app.listen(5000, function (err) {
  if (err) throw err;
  else {
    console.log("server is started on 5000");
  }
});
