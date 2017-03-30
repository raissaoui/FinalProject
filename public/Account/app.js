'use strict';
var promovacances = require('../Scrape/Scrap_Promovacances');
var lookvoyage = require('../Scrape/Scrap_LooKVoyage');
var voyagelastminute=require('../Scrape/Scrap_voyagelastminute');
var myaccount=require('../Account/MyAccount');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');


var app = express();
//app.use("/css",  express.static(__dirname + '/css'));
//app.set('view engine','ejs');

app.get('/', function (req, res) {
    res.render(__dirname + 'main',{result_text:"Hello, we'll predict if the vacation's price is acceptable. ",yes_no:"null",result:""});
});
/*
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());*/

app.post("/", function (req, res) {
    var link=req.body.destination;
    var destination="allemagne";
    Scrap_Promovacances.getpromovacances(destination, function(data){
        var jsonPV = JSON.parse(data); //jsonpromovacances
        Scrap_voyagelastminute.getvoyagelastminute(destination,function(data){
            var jsonVLM = JSON.parse(data); //jsonvoyagelastminute
            var result;
            if(jsonPV.price==null || jsonVLM.price==null){
                result="there is no vacation for ya aha";
                message="error";
            }
            else{
                if(jsonPV.price <=jsonVLM.price){

                      result=" Your vacation will be in that"+ jsonPV.hotel+". Go check in there"+jsonPV.link;
                    }
                    else{
                      result=" Your vacation will be in that"+ jsonVLM.hotel+". Go check in there"+jsonVLM.link;
                    }
            }
            res.render(__dirname + 'main',result);
            });
    });
});

app.listen(8080);
console.log("Every thing is possible with our server nigga");
