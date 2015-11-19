var ctx = require("axel");
var keypress = require("keypress");
keypress(process.stdin);
ctx.clear();

var upperRacketX = 15,upperRacketY = 0;
var lowerRacketX = 15,lowerRacketY = ctx.rows-20;

var point = function(){
	ctx.fg(255,25,2);
	ctx.text(x,y,"®");
}

var leftUp = function(intreval){
	clearInterval(intreval);
	var intreval = setInterval(function(){
		if(y == 0 || y == 16){
			gameOver(intreval);
		}
		if(x == 20){
			rigthUp(intreval);
		}
		if((y==upperRacketY+2)&& (x>=upperRacketX && x<=upperRacketX+15)){
			leftDown(intreval);
		}else{
			x--,y--;
		}
		ctx.bg(0,0,0);
		ctx.box(x+1,y+1,2,1);
		point();
	},50);	
}

var gameOver = function(intreval){
	clearInterval(intreval);
	ctx.fg(255,25,25);
	ctx.text(65,20,"Game Over");
	return;
}

var leftDown = function(intreval){
	clearInterval(intreval);

	var intreval = setInterval(function(){
		if(y == 0 || y == 16){
			gameOver(intreval);
		}
		if(x == 20){
			rigthDown(intreval);
		}
		if((y==lowerRacketY-1) && (x>=lowerRacketX && x<=lowerRacketX+15)){
			leftUp(intreval);
		}else{
			x--,y++;
		}
		ctx.bg(0,0,0);
		ctx.box(x+1,y-1,2,1);
		point();
	},50);
}

var rigthUp = function(intreval) { 
	clearInterval(intreval);

	var intreval = setInterval(function(){
		if(y == 0 || y == 16){
			gameOver(intreval);
		}
		if(x == ctx.cols-25){
			leftUp(intreval)
		}
		if((y==upperRacketY+2) && (x>=upperRacketX && x<=upperRacketX+15)){
			rigthDown(intreval);
		}else{
			x++,y--;
		}
		ctx.bg(0,0,0);
		ctx.box(x-1,y+1,2,1);
		point();
	},50);
}


var x = 20,y = 3;
var rigthDown = function (intreval){
	clearInterval(intreval);
	var intreval = setInterval(function(){
		if(y == 0 || y == 16){
			gameOver(intreval);
		}
		if(x == ctx.cols-25){
			leftDown(intreval);	
		}
		if((y==lowerRacketY-1) && (x>=lowerRacketX && x<=lowerRacketX+15)){
			rigthUp(intreval);
		}else{
			x++,y++;
		}
		ctx.bg(0,0,0);
		ctx.box(x-1,y-1,2,1);
		point();
	},50);
}


var deletePreviousRightRacket = function (upperX,upperY,lowerX,lowerY) {
	ctx.bg(0,0,0);
	ctx.box(upperX-2,upperY,15,1);
	ctx.box(lowerX-2,lowerY,15,1);
}

var deletePreviousLeftRacket = function (upperX,upperY,lowerX,lowerY) {
	ctx.bg(0,0,0);
	ctx.box(upperX+2,upperY,15,1);
	ctx.box(lowerX+2,lowerY,15,1);
}

var moveRacket = function (upperRacketX,upperRacketY,lowerRacketX,lowerRacketY) {
	ctx.bg(255,255,25);
	ctx.box(upperRacketX,upperRacketY,15,1);
	ctx.box(lowerRacketX,lowerRacketY,15,1);	
}

process.stdin.on('keypress', function (ch, key) {
	if(key.name == "right"){
		if(upperRacketX < ctx.cols-38){
			deletePreviousRightRacket(upperRacketX,upperRacketY,lowerRacketX,lowerRacketY);
			upperRacketX+=5,lowerRacketX+=5;
			moveRacket(upperRacketX,upperRacketY,lowerRacketX,lowerRacketY);
		}
	};
	if(key.name == "left"){
		if(upperRacketX > 15){
			deletePreviousLeftRacket(upperRacketX,upperRacketY,lowerRacketX,lowerRacketY);
			upperRacketX-=5,lowerRacketX-=5;
			moveRacket(upperRacketX,upperRacketY,lowerRacketX,lowerRacketY);
		}
	};
	if(key.name == "c"){
		process.exit(0);
		ctx.clear();
	}
});

var playScreen = function () {
	rigthDown();
	ctx.bg(25,250,250);
	ctx.box(10,0,125,20);
	ctx.bg(0,0,0);
	ctx.box(13,0,119,18);
	ctx.bg(255,255,25);
	ctx.box(upperRacketX,upperRacketY,15,1);
	ctx.box(lowerRacketX,lowerRacketY,15,1);
};
playScreen();

process.stdin.setRawMode(true);
process.stdin.resume();