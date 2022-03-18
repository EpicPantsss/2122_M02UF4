#!/usr/bin/node


let http = require("http");
let fs = require("fs");
let mongo_client = require("mongodb").MongoClient;
let ObjectId = require("mongodb").ObjectID;

let url = ("mongodb://localhost/");
let db;

console.log("Getting inside...");

mongo_client.connect(url, function(error, conn){
	console.log("... MongoDB");

	if (error){
		return;
	}

	db = conn.db("tffhd");
	
});

http.createServer(function(request, response){
	response.writeHead(200);

 	if (request.url == "/"){
    	fs.readFile("index.html", function(err, data){
			response.writeHead(200, {"Content-Type": "text/html"});
			response.end(data);
		});
		return;
    }

function send_data_list(db, req, res){
    let col = "";

    if (req.url == "/character"){
        col = "characters";
    }
    else if (req.url == "/items"){
        col = "items";
    }
    else{
        res.end();
    }

    let table = db.collection(col).find({}, { projection: { name:1 } });

    table.toArray(function(err, data){
            let characters_string = JSON.stringify(data);
            response.end(characters_string);
        });
}


	let url = request.url.split
	
	if (url.length == 2){
		send_data_list(db, request, response);
	}
	else{
		if (url[2].lenth != 24)
		{
			res.end();
			return;
		}
		if (url[1] == "characters"){
			let onj_id = new ObjectId(url[2]);
			let col = db.collection(url[1].find({"_id":obj_id}));
			
			col.toArray(function(err,data){
				let string = JSON.stringify(data);
				res.end(string);
			});
		}
		else if (url[1] == "items"){

		}
	}

}).listen(1095);
