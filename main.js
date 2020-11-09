"use strict";
let express = require("express"),
	login = require("./modules/loginModule.js"),
	parser = require("body-parser"),
	app = express();
app.use(parser.urlencoded({extended: false}));
app.use(parser.json());
app.set("view engine", "pug");
app.set("views", "./views");


let Twitter = require("twitter");

let client = new Twitter({
	consumer_key: "consumer key",
	consumer_secret: "consumer secret",
	access_token_key: "access token key",
	access_token_secret: "acces token secret"
});
-
app.get("/", function(request,response){ 
	let obj = { 
		title: "Login",
		bottomMessage: "Sign in for exclusive access!",
		homeTab: "Login",
		secondaryTab: "Create Account", 
		submitButton: "DO IT",
		homeTabPath: "/",
		secondaryTabPath: "/create_account",
		httpAction: "/login_attempt"
	}; 
	response.render("login.pug",obj); 
});

app.get("/create_account", function(request,response){
	let obj = {       
		title: "Create Account",
		bottomMessage: "Select DONE when you are finished",
		homeTab: "Create Account",
		secondaryTab: "Login", 
		submitButton: "DONE",
		homeTabPath: "/create_account",
		secondaryTabPath: "/",
		httpAction: "/register_attempt"
	};
	response.render("login.pug",obj);
});


app.get("/getTweets", function(request, response){
	client.get("search/tweets",{q: "#csc365"}, function(error, tweets) {
		let result = [];
		if (!error) {
			tweets.statuses.forEach(function(tweet){
				result.push({"text": tweet.text, "followers": tweet.user.followers_count});
			});
		}
		else{console.log(error);}
		response.json(result);
	});
});

app.post("/login_attempt", function(request, response){
	let username = request.body.user;
	let password = request.body.password;
	if(login.loginCheck(username, password)){
		response.render("goodjob.pug");
	}
});

app.post("/register_attempt", function(request, response){
	let username = request.body.user;
	let password = request.body.password;
	login.register(username, password);
	response.render("goodjob.pug");
});

app.listen(3000, function() {
	console.log("Listening on port 3000");
});
app.use(express.static("resources"));
