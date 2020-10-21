"using strict";
let globalData = [];
let refreshStatus = false;
let setUp = function(){
	document.getElementById("img").src = "/images/load.gif";
	let request = new XMLHttpRequest();
	request.open("GET", "/getTweets");
	request.addEventListener("load", function(){
	  let data = JSON.parse(request.responseText);
	  let str ="";
	  data.forEach(function(item){
	  	globalData.push(item);
	  });
	if(!refreshStatus){
		changeNodes(data);}
	else{refreshTweets(data)}
	});

	request.addEventListener("loadend", function(evt){
	document.getElementById("img").src = "/images/twitter.png";
	});
	request.send();
};

let displayFollowers = function(evt){
	globalData.forEach(function(item){
		if(evt.target.id === item.text){
			alert("Followers: "+item.followers);
		}
	});
};

let changeNodes = function(arr){
	let newNode = document.createElement("ul"),
		oldNode = document.getElementById("tweets");
	newNode.setAttribute("id", "tweets");
	arr.forEach(function(item){
		let liNode = document.createElement("li"),
			text = document.createTextNode(item.text);
		liNode.setAttribute("class", "tweets");
		liNode.setAttribute("id", item.text);
		liNode.appendChild(text);
		newNode.appendChild(liNode);
	});
	oldNode.parentNode.replaceChild(newNode, oldNode);

	let tweetEvt = document.getElementsByClassName("tweets");
	for(let i = 0; i < tweetEvt.length; i++){
		tweetEvt[i].addEventListener("click", displayFollowers);
	}
};

let openAbout = function(evt){
	let newNode = document.createElement("p"),
		oldNode = document.getElementById("tweets");
	newNode.setAttribute("id", "about_text");
	text = document.createTextNode("Hi there! I know you are here because you think this is the best (and you are right), and you want to learn more. Well you can't. It's mine. "+
									"Get your own thing. Stop trying to steal my thing! (Nicholas Jaross seal of approval)");
	newNode.appendChild(text);
	oldNode.parentNode.replaceChild(newNode, oldNode);
};

let refreshTweets = function(arr){
	let newNode = document.createElement("ul"),
		oldNode = document.getElementById("about_text");
	newNode.setAttribute("id", "tweets");
	arr.forEach(function(item){
		let liNode = document.createElement("li"),
			text = document.createTextNode(item.text);
		liNode.setAttribute("class", "tweets");
		liNode.setAttribute("id", item.text);
		liNode.appendChild(text);
		newNode.appendChild(liNode);
	});
	oldNode.parentNode.replaceChild(newNode, oldNode);

	let tweetEvt = document.getElementsByClassName("tweets");
	for(let i = 0; i < tweetEvt.length; i++){
		tweetEvt[i].addEventListener("click", displayFollowers);
	}
};

let refreshChange = function(evt){
	refreshStatus = true;
	setUp();
};

document.getElementById("about").addEventListener("click", openAbout);

document.getElementById("refresh").addEventListener("click", refreshChange);

setUp();
setInterval(function(){setUp();}, 3000000);