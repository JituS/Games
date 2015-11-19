var http = require("http");
var fs = require("fs");
var options = {
	host : "www.gettyimages.in",
	path : "/gi-resources/images/Homepage/Hero/UK/CMS_Creative_164657191_Kingfisher.jpg"
};

var readedData = "";

var onRequest = function(res) {
	res.on("data",function(reading){
		readedData+=reading;
	});
	res.on("end",function(){
		fs.writeFileSync("./downloadedData.html",readedData);
	});
};

var error = function(error){
	console.log(error);
}

http.request(options,onRequest).on("error",error).end();

var server = http.createServer(function(req,res){
	var filepath = "." + req.url;
	if(filepath == "./") filepath = "./TTT.html"
	console.log(filepath)
	fs.readFile(filepath,function(e,content){
		res.end(content);
	});
});
server.listen(8080);

