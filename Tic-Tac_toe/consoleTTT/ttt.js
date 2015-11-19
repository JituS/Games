var lib = require("./tttLib.js").lib;
var axel = require("axel");

var instruction = "............instruction............\n\t-------------------------------------------\n\n1	This game is made for two players (player X and player 0)\n2	turn can be played like [  00  ,  01  ,  02  ,  10  ,  11  ,  12  ,  20  ,  21  ,  22  ]";

process.stdin.setEncoding("utf8")

var board = lib.getBoard();

process.stdin.on("readable",function(){
	axel.clear();
	process.stdout.cursorTo(10,1)
	axel.fg(222,19,222);
	console.log(instruction);
	var turn = process.stdin.read();
	if(turn!=null){
		board = lib.writeTurn(board,turn);
	};
	lib.showBoard(board);
});	
