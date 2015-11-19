var ctx = require("axel");
var keypress = require("keypress");
keypress(process.stdin);
ctx.clear();
var fs = require("fs");
var marioX = 30, marioY = 15,score=0;

var hurdle = function(){
	score++;
	var x=120,y=17;
	var time= Math.ceil(Math.random()*20);
	if(time < 10) time = 20;
	var interval = setInterval(function(){
		if((y==marioY+2 || y == marioY+5 ) && (x==marioX||x==marioX-1)){
			if(fs.readFileSync("q.js","utf8") < score)
			fs.writeFileSync("q.js",score);
			process.exit();
		}marioX
		if(x == 50){
			hurdle();
		}
		ctx.bg(255,250,12);
		ctx.box(x,y,1,3);
		ctx.bg(0,0,0);
		ctx.box(x+1,y,1,3);
		x--;
		if(x == 18){
			ctx.bg(0,0,0);
			ctx.box(x+1,y,1,3);
			clearInterval(interval);
		}
	},time);
}

var moveScreen = function(){
	var x=120,y=17;
	var interval = setInterval(function(){
		if((y==marioY+2 || y == marioY+5 ) && (x==marioX||x==marioX-1)){
			if(fs.readFileSync("q.js","utf8") < score)
			fs.writeFileSync("q.js",score);
			process.exit();
		}
		if(x == 75){
			hurdle(marioX,marioY);
		}
		ctx.bg(255,250,12);
		ctx.box(x,y,1,3);
		ctx.bg(0,0,0);
		ctx.box(x+1,y,1,3);
		x--;
		if(x == 18){
			ctx.bg(0,0,0);
			ctx.box(x+1,y,1,3);
			clearInterval(interval);
		}
	},10);
}

var down = function () {
	var interval = setInterval(function(){
		marioY++;
		ctx.bg(0,0,0);
		ctx.box(marioX,marioY-1,1,5);
		ctx.bg(255,250,12);
		ctx.box(marioX,marioY,1,5);
		if(marioY==15){
			clearInterval(interval);
		}
	},30);
}

var up = function () {
	var interval = setInterval(function(){
		marioY--;
		ctx.bg(0,0,0);
		ctx.box(marioX,marioY+1,1,5);
		
		ctx.bg(255,250,12);
		ctx.box(marioX,marioY,1,5);

		if(marioY==5){
			clearInterval(interval);
			down(marioX,marioY)
		}
	},30);
}

var jumpMario = function(x,y){
	up(x,y);
}

var createScreen = function () {
	ctx.bg(10,21,190);
	ctx.box(15,1,120,30);
	ctx.bg(0,0,0);
	ctx.box(16,2,118,28);
	ctx.bg(121,20,121);
	ctx.box(16,20,118,10);
	ctx.bg(250,250,12);
	ctx.box(30,15,1,5);
	moveScreen(score);
}

process.stdin.on("keypress",function (ch,key) {
	if(key.name == "c"){
		process.exit(0)
	}
	if(key.name == "up"){
		if(marioX == 30 && marioY == 15){
			ctx.text(138,2,"High Score : ");
			ctx.text(150,2,fs.readFileSync("q.js","utf8"));
			ctx.text(138,3,"Score : ");
			ctx.text(146,3,score.toString());
			jumpMario();
		}
	}
})


createScreen();

process.stdin.setRawMode(true);
process.stdin.resume();