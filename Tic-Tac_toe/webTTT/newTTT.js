var chances = 0;
var chancesCanBePlayed = {zeroZero:"00",
	zeroFirst:"01",
	zeroSecond:"02",
	firstZero:"10",
	firstFirst:"11",
	firstSecond:"12",
	secondZero:"20",
	secondFirst:"21",
	secondSecond:"22"};

var gameOver = false;

var winningChancesOfPlayer1 = [["00","01","02"],
  ["10","11","12"],
  ["20","21","22"],
  ["00","11","22"],
  ["02","11","20"],
  ["00","10","20"],
  ["01","11","21"],
  ["02","12","22"]];

var winningChancesOfPlayer2 = JSON.parse(JSON.stringify(winningChancesOfPlayer1));
var getBoard = function(){
	var board = new Array(4).join("*").split("");
	board = board.map(function(each){
		return new Array(4).join(" ").split("");
	});
	return board;
};
var board = getBoard();
var players = {player1:{symbol:"0",chances:[]},player2:{symbol:"X",chances:[]}};

var main = function(turn){
	if(!gameOver) board = writeTurn(board,turn);
	boardDesign(board);
}; 


var checkPosition = function(board,turn){
	if(+turn[0]<=2 && +turn[1]<=2){
		return board[turn[0]][turn[1]] == " ";
	}
	return false;
};

var checkWinner = function(player,turn,board){
	var winner = false;
	for(var i = 0;i < winningChancesOfPlayer1.length;i++){
		for(var j = 0;j<winningChancesOfPlayer1[i].length;j++){
			(player == "0")
			? winningChancesOfPlayer1[i][j] = (winningChancesOfPlayer1[i][j] == turn) ? "":winningChancesOfPlayer1[i][j]
			: winningChancesOfPlayer2[i][j] = (winningChancesOfPlayer2[i][j] ==turn) ? "":winningChancesOfPlayer2[i][j];
			if(winningChancesOfPlayer1[i].join("")==""){
				boardDesign(board);
				winner = "Player 0 wins......."
				gameOver = true;
			};
			if(winningChancesOfPlayer2[i].join("")==""){
				boardDesign(board);
				winner = "Player X wins......."
				gameOver = true;
			};
		};
	};
	return winner;
};


var writeTurn = function(board,turn){
	if(checkPosition(board,turn)){
		chances++;
		board[turn[0]][turn[1]] = (chances%2) ? players.player1.symbol : players.player2.symbol;
		document.getElementById("turn").innerHTML = (chances%2) ? "Player X turn" : "Player 0 turn";
		(chances%2) ? players.player1.chances.push(turn) : players.player2.chances.push(turn);
		winner = (chances%2) ? checkWinner(players.player1.symbol,turn,board) : checkWinner(players.player2,turn,board);
		document.getElementById("winText").innerHTML = winner || ""; 
		if(board.join().match(/(\s)/g) == null) boardDesign(board);
		return board;
	};
	return board;
};	

var boardDesign = function(board){
	if(chances ==9 && winner ==false) document.getElementById("winText").innerHTML = "Game Over...<br> no one wins the game"; 
	document.getElementById("firstFirst").innerHTML = board[1][1];
	document.getElementById("zeroFirst").innerHTML = board[0][1];
	document.getElementById("zeroZero").innerHTML = board[0][0];
	document.getElementById("zeroSecond").innerHTML = board[0][2];
	document.getElementById("firstZero").innerHTML = board[1][0];
	document.getElementById("firstSecond").innerHTML = board[1][2];
	document.getElementById("secondSecond").innerHTML = board[2][2];
	document.getElementById("secondZero").innerHTML = board[2][0];
	document.getElementById("secondFirst").innerHTML = board[2][1];
};

