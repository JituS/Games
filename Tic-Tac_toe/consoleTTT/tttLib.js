var lib = {};
exports.lib = lib;
var chances = 0;
var players = {player1:{symbol:"0",chances:[]},player2:{symbol:"X",chances:[]}};

var winningChancesOfPlayer1 = [["00","01","02"],
					  ["10","11","12"],
					  ["20","21","22"],
					  ["00","11","22"],
					  ["02","11","20"],
					  ["00","10","20"],
					  ["01","11","21"],
					  ["02","12","22"]];
var winningChancesOfPlayer2 = JSON.parse(JSON.stringify(winningChancesOfPlayer1));

lib.getBoard = function(){
	var board = new Array(4).join("*").split("");
	board = board.map(function(each){
		return new Array(4).join(" ").split("");
	});
	return board;
};

lib.checkPosition = function(board,turn){
	var turn = turn.split("");
	if(turn.length==3 && +turn[0]<=2 && +turn[1]<=2){
		return board[turn[0]][turn[1]] == " ";
	}
	return false;
};

lib.checkWinner = function(player,chance,board){
	for(var i = 0;i < winningChancesOfPlayer1.length;i++){
		for(var j = 0;j<winningChancesOfPlayer1[i].length;j++){
			if(player.symbol == "0"){
				winningChancesOfPlayer1[i][j] = (winningChancesOfPlayer1[i][j] == chance) ? "":winningChancesOfPlayer1[i][j];
				if(winningChancesOfPlayer1[i].join("")=="") lib.showBoard(board),console.log("\nPlayer 0 Wins....."),process.exit(0); 
			}else{
				winningChancesOfPlayer2[i][j] = (winningChancesOfPlayer2[i][j] ==chance) ? "":winningChancesOfPlayer2[i][j];
				if(winningChancesOfPlayer2[i].join("")=="") lib.showBoard(board),console.log("\nPlayer X Wins....."),process.exit(0); 
			}
		}
	}
};

lib.writeTurn = function(board,turn,player){
	if(lib.checkPosition(board,turn) && chances<10){
		chances++;
		board[turn[0]][turn[1]] = (chances%2) ? players.player1.symbol : players.player2.symbol;
		(chances%2) ? players.player1.chances.push(turn.slice(0,2)) : players.player2.chances.push(turn.slice(0,2));
		(chances%2) ? lib.checkWinner(players.player1,turn.slice(0,2),board) : lib.checkWinner(players.player2,turn.slice(0,2),board);
		if(board.join().match(/(\s)/g) == null) lib.showBoard(board),console.log("Drow...."), process.exit();
		return board;
	};
	process.stdout.cursorTo(20,20);
	console.log("Please enter correct position.....");
	return board;
};	

var boardDesign = function(board){
	var newBoard = board.map(function(each,i){
		return i+".  "+each.join(" |  ");
	});
	var index=[];
	for(var i=0;i<board.length;i++){
		for(var j=0;j<board.length;j++){
			if(board[i][j] == " ")
				index.push([i,j]);
		}
	}
	process.stdout.cursorTo(24,8);
	console.log("  0     1     2");
	process.stdout.cursorTo(20,9);
	console.log("______________________\n")
	process.stdout.cursorTo(24,11);
	console.log(newBoard.join("\n\t\t\t================\n\t\t\t"))
};


lib.showBoard = function(board,player){
	boardDesign(board);
	process.stdout.cursorTo(20,17);
	process.stdout.write(chances%2 ? "player X  turn:  ":"player 0  turn:  ");
};	

