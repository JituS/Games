var test = {};
exports.test = test;
var lib = require("./tttLib.js").lib;
var assert = require("assert");
test["getBoard gives a 3X3 board"] = function(){
	var expexted = [
		[ , , , ],
		[ , , , ],
		[ , , , ]
	];
	assert.deepEqual(expexted,lib.getBoard());
};

test["writeTurn gives new turn as input and insert it into board"] = function(){
	var expexted = [
		[ , ,0, ],
		[ , , , ],
		[ , , , ]
	]; 
	var previousBoard = [
		[ , , , ],
		[ , , , ],
		[ , , , ]
	]; 
	assert.deepEqual(expexted,lib.writeTurn(previousBoard,"02","0"));
}

test["writeTurn gives previous Board is wrong position entered"] = function(){
	var previousBoard = [
		[ , , , ],
		[ , , , ],
		[ , , , ]
	]; 
	assert.deepEqual(previousBoard,lib.writeTurn(previousBoard,"05","0"));
}
