"use strict";
let object = {};
let fs = require("fs");
let file = fs.readFileSync("logins.json");
file = JSON.parse(file);


object.register = function(username, password){

	let newObj = {"username": username, "password": password};
	file.push(newObj);
	fs.writeFileSync("logins.json", JSON.stringify(file));
	return true;
};


object.loginCheck = function(username, password){
	for(let i = 0; i < file.length; i++){
		if(file[i].username === username){
			if(file[i].password === password){
				return true;
			}
		}
	}
	return false;
};

module.exports = object;