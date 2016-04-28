var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var multer = require('multer'); 

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//app.use(multer()); // for parsing multipart/form-data
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var dbConnectStr = "mongodb://adminJA:wt344**@localhost,ds017231.mlab.com:17231/areainfo/Country";

// import the mongoose library
var mongoose = require("mongoose");
mongoose.connect(dbConnectStr);

// This is our mongoose model for countries
var CountrySchema, Country;

CountrySchema = mongoose.Schema({
    InfoTxt: [String],
    ImageQueryTxt: String,
    AreaName: String
});

Country = mongoose.model("Country", CountrySchema);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    //we're connected!
    console.log("Connected to " + dbConnectStr + ".");

//    var newCountry = new Country({
//        InfoTxt: ["Spain is a Country.", "Spain grows wine."],
//        ImageQueryTxt: "Madrid",
//        AreaName: "Spain"
//    });
//
//    newCountry.save(function (err) {
//        if (err)
//            throw err;
//
//        console.log('User created!');
//    });

//    Country.find({}, function (err, items) {
//        if (err !== null) {
//            throw err;
//        } else {
//            console.log(items);
//        }
//    });

//    Country.findOne({AreaName: "France"}, function (err, item) {
//        if (err !== null) {
//            console.log(err);
//        } else {
//            console.log(item);
//        }
//    });
});

// The field used here for getJSON() is req.query
app.get("/getItem", function (req, res) {
    var queriedAreaName = req.query.geo_area_name;
    console.log(queriedAreaName);
    Country.findOne({AreaName: queriedAreaName}, function (err, item) {
        if (err !== null) {
            console.log("Server Error");
        } else {
            console.log("Server query success:" + item);
            res.send(item);
        }
    });
});

//app.post("/putItem", function (req, res) {
//    var newItem = new Item({"description": req.body.description,
//        "sku": req.body.sku,
//        "quantity": req.body.quantity,
//        "price": req.body.price});
//    newItem.save(function (err, result) {
//        if (err !== null) {
//            console.log(err);
//            res.send("ERROR");
//        } else {
//            res.send("Item inserted/updated.");
//        }
//    });
//});



module.exports = app;
