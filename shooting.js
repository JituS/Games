var axel = require("axel");
axel.clear();
var keypress = require("keypress");
var dartCordinate = {x:0,y:0};
var arrowCordinate = {x:130,y:20},score=0;
axel.bg(11,155,151);
axel.fg(0,0,0);

var welcome = function(){
	axel.text(50,1,"Welcome to Shooting game: ");
}

var getDart = function (){
	axel.clear();
	welcome();
	process.stdout.cursorTo(130,2);
	console.log("Score: ",score);
	process.stdout.write(createArrow(arrowCordinate.x,arrowCordinate.y));
	if(dartCordinate.y == 25) dartCordinate.y=0;
	process.stdout.cursorTo(dartCordinate.x,dartCordinate.y);
	var dart = new Array(10).join("**||\n");
	return dart;
};

var createArrow = function(x,y,moving){
	if(x == 2) {
		arrowCordinate = {x:130,y:20};
	}
	if(arrowCordinate.y >= dartCordinate.y && arrowCordinate.y <= dartCordinate.y + 10 && x == 3){
		score++;
	};
	var arrow = "<" + new Array(5).join("=");
	process.stdout.cursorTo(x,y);
	return (arrow);
};

var moveDart = function(dart){
	var moving = setInterval(function(){
		var newDart = getDart(dartCordinate.x,dartCordinate.y++);
		process.stdout.write(newDart);
		if(chances >=10){
			clearInterval(moving);
			process.stdout.clearScreenDown();
			console.log("game over(press control+c)");
		} 
	},50);
}

keypress(process.stdin);
var chances = 0;

var moveArrow = function(){
	if(chances <10){
		var a = setInterval(function(){
			arrowCordinate.x--,arrowCordinate.y;
			if(arrowCordinate.x == 2){
				chances++;
				arrowCordinate = {x:130,y:20};
				clearInterval(a);			
			}
			process.stdout.write(createArrow(arrowCordinate.x,arrowCordinate.y));
		},5);
	}else{
	}
};

process.stdin.on("keypress",function(ch,key){
	if(key.name == "up" && arrowCordinate.x == 130 && arrowCordinate.y == 20) moveArrow();
	if(key.name == "c") process.exit();
});

var start = function(){
	var dart = getDart();
	moveDart(dart);
};

start();
process.stdin.setRawMode(true);
process.stdin.resume();
