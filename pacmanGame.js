var keypress = require("keypress");
var axel = require("axel");
axel.clear();
axel.fg(230,152,151)
var pacman="$",pacmanCo_rd = {x:16,y:31},hurdles=[],foodCords=[],score=0;
var interval = setInterval(function(){
},100);

var printHurdle = function(){
	var hurdle = new Array(13).join("#");
	for(var i=0;i<10;i++){
		xCordinate = Math.ceil(Math.random()*100);
		yCordinate = Math.ceil(Math.random()*30);
		if((xCordinate < 30 || xCordinate > 80) || yCordinate < 3 || yCordinate > 25) {
			for(var j=30;j<42;j++){
				hurdles.push(JSON.stringify([j,10]));
			}
			process.stdout.cursorTo(30,10);
			console.log(hurdle);
		}
		else{
			for(var j=xCordinate;j<xCordinate+12;j++){
				hurdles.push(JSON.stringify([j,yCordinate]));
			}
		process.stdout.cursorTo(xCordinate,yCordinate);
			console.log(hurdle);
		};
	};
};

var printBorder = function(x,y,symbol){
	process.stdout.cursorTo(x,y);
	console.log(new Array(102).join(symbol))
};

var pacmanPosition = function(x,y,previousX,previousY){
	process.stdout.cursorTo(x,y);
	console.log(pacman);
	process.stdout.cursorTo(previousX,previousY);
	console.log(" ");
}

var printSides = function(){
	var sides = new Array(32).join("|").split("");
	for(var i=0;i<sides.length;i++){
		process.stdout.cursorTo(14,i+2);
		console.log(sides[i]);
		process.stdout.cursorTo(115,i+2);
		console.log(sides[i]);
	};
};

var scores = function(){
	if(foodCords.indexOf(JSON.stringify([pacmanCo_rd.x,pacmanCo_rd.y])) >= 0){
		score++;	
		delete foodCords[foodCords.indexOf(JSON.stringify([pacmanCo_rd.x,pacmanCo_rd.y]))];
		process.stdout.cursorTo(130,2);
		console.log("Score : "+score);
	}
}

var gameOver = function(msg){
	process.stdout.clearScreenDown();
	process.stdout.cursorTo(50,20);
	console.log(msg,score);
	process.exit(0);
}

var right = function(){
	scores();

	if(foodCords.join("").split(",").join("").length==0) gameOver("You Win !!! Your scores is ");
	if(pacmanCo_rd.x > 113 || hurdles.indexOf(JSON.stringify([pacmanCo_rd.x,pacmanCo_rd.y]))!=-1) gameOver("Game Over !!! Your scores is ");
	pacmanCo_rd.x+=1;
	pacmanPosition(pacmanCo_rd.x,pacmanCo_rd.y,pacmanCo_rd.x-1,pacmanCo_rd.y);
};

var left = function(){
	scores();
	if(foodCords.join("").split(",").join("").length==0) gameOver("You Win !!! Your scores is ");

	if(pacmanCo_rd.x < 17 || hurdles.indexOf(JSON.stringify([pacmanCo_rd.x,pacmanCo_rd.y]))!=-1 ) gameOver("Game Over !!! Your scores is ");
	pacmanCo_rd.x-=1;
	pacmanPosition(pacmanCo_rd.x,pacmanCo_rd.y,pacmanCo_rd.x+1,pacmanCo_rd.y);
};

var up = function(){
	scores();
	if(foodCords.join("").split(",").join("").length==0) gameOver("You Win !!! Your scores is ");

	if(pacmanCo_rd.y < 3 || hurdles.indexOf(JSON.stringify([pacmanCo_rd.x,pacmanCo_rd.y]))!=-1 ) gameOver("Game Over !!! Your scores is ");
	pacmanCo_rd.y-=1;
	pacmanPosition(pacmanCo_rd.x,pacmanCo_rd.y,pacmanCo_rd.x,pacmanCo_rd.y+1);
}

var down = function(){
	scores();
	if(foodCords.join("").split(",").join("").length==0) gameOver("You Win !!! Your scores is ");

	pacmanCo_rd.y+=1;
	if(pacmanCo_rd.y > 31 ||  hurdles.indexOf(JSON.stringify([pacmanCo_rd.x,pacmanCo_rd.y]))!=-1) gameOver("Game Over !!! Your scores is ");
	pacmanPosition(pacmanCo_rd.x,pacmanCo_rd.y,pacmanCo_rd.x,pacmanCo_rd.y-1);
};

var welcome = function(){
	process.stdout.cursorTo(55,0);
	console.log("Welcome to PAC-MAN");
};

var pacmanFood = function(){
	var pacmanFood = new Array(30);
	for(var i=0;i<pacmanFood.length;i++){
		pacmanFood[i] = new Array(100).join(".");
		var cords = pacmanFood[i].split("").map(function(each,index){
			return JSON.stringify([index+16,i+2]);
		});	
		if(i!=29)
		foodCords = foodCords.concat(cords);
	}
	process.stdout.cursorTo(16,2);
	console.log(pacmanFood.join("\n\t\t"));
	
}


var designView = function(){
	welcome();
	printBorder(15,1,"_");
	printSides();
	pacmanFood();
	printHurdle();
	foodCords = foodCords.filter(function(each){
		return hurdles.indexOf(each) == -1;
	})
	process.stdout.cursorTo(16,2);
	printBorder(15,32,"_");
	process.stdout.cursorTo(pacmanCo_rd.x,pacmanCo_rd.y);
	console.log(pacman);
};


keypress(process.stdin);
process.stdin.on("keypress",function(ch,key){
	if(key.name == "right"){
		clearInterval(interval);
		interval = setInterval(right,50);	
	}; 
	if(key.name == "left") {
		clearInterval(interval);
		interval = setInterval(left,50);	
	}
	if(key.name == "up"){
		clearInterval(interval);
		interval = setInterval(up,100);	
	}
	if(key.name == "down"){
		clearInterval(interval);
		interval = setInterval(down,100);	
	}
	if(key.name == "foodCords"){
		process.exit(0);
	}
});

designView();

process.stdin.setRawMode(true);
process.stdin.resume();