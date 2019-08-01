//Require frameworks and libraries
const express = require("express");
const request = require("request");
var app = express();

//Serve Public directory
app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs")

//index route
app.get("/", (req, res) => {
	var url = "https://api.nasa.gov/planetary/apod?api_key=4iNzjDuFNlssLja0bCjfHeUc8tM3RBk1mIaSLbQ0";
	request(url, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var apod = JSON.parse(body);
			res.render("index", { apod: apod });
		}
	})
})

app.get("/APOD", (req, res) => {
	var query = req.query.search;
	var url = "https://api.nasa.gov/planetary/apod?api_key=4iNzjDuFNlssLja0bCjfHeUc8tM3RBk1mIaSLbQ0&date=" + query;
	console.log(url);
	request(url, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var apod = JSON.parse(body);
			res.render("index", { apod: apod });
		}
	})
})


//rover route
app.get("/rover", (req, res) => {
	var url = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key=4iNzjDuFNlssLja0bCjfHeUc8tM3RBk1mIaSLbQ0"
	request(url, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var data = JSON.parse(body);
			res.render("rover", { data: data });
		}
	})
})

app.get("/rover/sol", (req, res) => {
	var query = req.query.sol;
	var url = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=" + query + "&api_key=4iNzjDuFNlssLja0bCjfHeUc8tM3RBk1mIaSLbQ0";
	console.log(url);
	request(url, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var data = JSON.parse(body);
			res.render("rover", { data: data });
		}
	})
})

app.get("/rover/earth-date", (req, res) => {
	var query = req.query.date;
	var url = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=" + query + "&api_key=4iNzjDuFNlssLja0bCjfHeUc8tM3RBk1mIaSLbQ0";
	console.log(url);
	request(url, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var data = JSON.parse(body);
			res.render("rover", { data: data });
		}
	})
})

app.listen("3000", "127.0.0.1", () => {
	console.log("server running");
})