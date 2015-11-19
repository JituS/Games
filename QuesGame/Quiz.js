var chalk=require("chalk");
var performanceObj={"0":"Worst","1":"Poor","2":"Need to improve","3":"Fair","4":"Good","5":"Excellent"}
var tabs="\t\t\t\t\t\t\t\t";
var spaces="\n\n\n\n\n\n";
var finalTxt=chalk.blue(tabs+"Thanks For Playing...............\n"+tabs+"Jitendra ban gya crorepati.........");
var fs=require("fs");
var properAns=['A','B','C','A','C'];


var main=function(){
	var fileTxt=fs.readFileSync('question.txt','utf8');
	var QuestionsArray=fileTxt.split("\n");
	quizTime(QuestionsArray);
}


var colorArray=["red","blue","green","red","cyan","grey"];
var i=-1;
var quizTime=function(inst){
	var answerArray=[];
	process.stdin.setEncoding('utf8');
	process.stdin.on('readable',function(){
		i+=1;
		if(inst.join('').length!=0) console.log(chalk[colorArray[i]](inst.splice(0,35).join('\n')));
		if(inst.length<176) console.log(chalk.green("Type your Answer :  "));
		var ans=process.stdin.read();
		answerArray.push(ans);
		if(answerArray.length==7){
			console.log(spaces+spaces);
			answerArray=answerArray.join('').split('\n');
			answerArray=filterAns(answerArray);
			answerArray.forEach(printAns);		
			performance=answerArray.filter(getPerformance);
			console.log(chalk.bgCyan(tabs+"Your performance was :"+performanceObj[performance.length.toString()]+tabs,tabs,tabs+"\n"+finalTxt+spaces+spaces+spaces+spaces));
			process.exit(0);	
		}
	});
};


var filterAns=function(answerArray){
	return answerArray.filter(function(each){
		return each!='';
	});
};

var printAns=function(each,index){
	console.log((properAns[index]==each)?chalk.green("Q.",index+1,"right"):chalk.red("Q.",index+1,"Wrong"));
};

var getPerformance=function(each,index){
	return (properAns[index]==each);
}






main();