//Require frameworks and libraries
const express = require("express");
const request = require("request");
var app = express();

//Serve Public directory
app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs");
var apikey = process.env.apikey;

//index route
app.get("/", (req, res) => {
	var url = "https://api.nasa.gov/planetary/apod?api_key="+apikey;
	request(url, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var apod = JSON.parse(body);
			res.render("index", { apod: apod });
		}
	})
})

app.get("/APOD", (req, res) => {
	var query = req.query.search;
	var url = "https://api.nasa.gov/planetary/apod?api_key=" + apikey + "&date=" + query;
	request(url, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var apod = JSON.parse(body);
			res.render("index", { apod: apod });
		}
	})
})


//rover route
app.get("/rover", (req, res) => {
	var url = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key=" + apikey;
	request(url, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var data = JSON.parse(body);
			res.render("rover", { data: data });
		}
	})
})

app.get("/rover/sol", (req, res) => {
	var query = req.query.sol;
	var url = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=" + query + "&api_key=" + apikey;
	request(url, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var data = JSON.parse(body);
			res.render("rover", { data: data });
		}
	})
})

app.get("/rover/earth-date", (req, res) => {
	var query = req.query.date;
	var url = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=" + query + "&api_key=" + apikey;
	request(url, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var data = JSON.parse(body);
			res.render("rover", { data: data });
		}
	})
})

//DSCOVR EPIC ROUTE

app.get("/epic", (req, res) => {
	var defaultdate = "2019-01-01";
	var date = defaultdate.replace(/-/g, "/");
	var url = "https://api.nasa.gov/EPIC/api/natural/date/" + defaultdate + "?api_key=" + apikey;
	console.log(url);
	request(url, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var data = JSON.parse(body);
			res.render("epic", { data: data, date: date });
		}
	})
})

app.get("/epic/pictures", (req, res) => {
	var query = req.query.date;
	var date = query.replace(/-/g, "/");
	var url = "https://api.nasa.gov/EPIC/api/natural/date/" + query + "?api_key=" + apikey;
	request(url, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var data = JSON.parse(body);
			res.render("epic", { data: data, date: date});
		}
	})
})

app.listen(process.env.PORT || "3000", process.env.IP, () => {
	console.log("server running");
})