var ctx = require('axel');
var keypress = require('keypress');
ctx.clear();

var bricks=[];
var printBricks = function(){
	for(var y=0;y<ctx.rows/2;y++){
		bricks[y]=[];
		for(var x=0;x<ctx.cols;x+=2){
			if(y%2==0 && x%2==0){
				bricks[y].push(1);
				ctx.bg(255,255,25);
				ctx.box(x,y,1,1);	
			}
		}
	}
}

var move = function(x,y){
  	ctx.bg(255,0,25);
	ctx.box(x,y,10,1);
	ctx.bg(255,255,255);
	ctx.box(x,y,2,1);
	return;
}

var shoot = function (x,y) {
	var interval = setInterval(function () {
		ctx.bg(255,255,25);
		ctx.box(x,y-2,2,1);
		y--;
		ctx.bg(0,0,0);
		ctx.box(x,y,2,1);
		if(y == 0) clearInterval(interval);
	},10);
}

var main = function (){
	printBricks();
	var x = 40 , y = 35; 
	keypress(process.stdin);
	process.stdin.on('keypress', function (ch, key) {
		if (key.name == "right") {
			if(x<ctx.cols){
				ctx.bg(0,0,0);
				ctx.box(x-5,y,10,1);
				ctx.bg(0,0,0);
				ctx.box(x+3,y-1,2,1);
				move(x++ , y);
			}
			move(x, y);
		};
		if (key.name == "left") {
			if(x>0){
				ctx.bg(0,0,0);
				ctx.box(x+5,y,10,1);
				ctx.bg(0,0,0);
				ctx.box(x+5,y-1,2,1);
				move(x-- , y);
			}
			move(x, y);
		};
		if (key.name == "up") {
			shoot(x,y);
		};
		if (key.name == "c") {
	 		process.exit(0)
		};
	});
}

main();

process.stdin.setRawMode(true);
process.stdin.resume();