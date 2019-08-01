//Require frameworks and libraries
const express = require("express");
const request = require("request");
var app = express();

//Serve Public directory
app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs")

app.get("/", (req, res) => {
	var url = "https://api.nasa.gov/planetary/apod?api_key=4iNzjDuFNlssLja0bCjfHeUc8tM3RBk1mIaSLbQ0";
	request(url, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var apod = JSON.parse(body);
			res.render("index", { apod: apod });
		}
	})
})

app.get("/results", (req, res) => {
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

app.listen("3000", "127.0.0.1", () => {
	console.log("server running");
})