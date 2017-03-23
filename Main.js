var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();


var Scrap_Promovacances = require('Scrap_Promovacances.js')
//var Scrap_LookVoyage= require('Scrap_LookVoyage.js');
//var Scrap_LookVoyage= require('Scrap_voyagelastminute.js');
var url="";


function init(res,type){
	res.setHeader('Content-Type', type);
	res.header('Access-Control-Allow-Origin', "*");
	res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
}


var jsonpromovacances = { price: "" , hotel: "", link: "" };
var jsonvoyagelastminute = { price: "" , hotel: "", link: "" };
var jsonlookvoyage= { price: "" , hotel: "", link: "" };



Scrap_Promovacances.promovacances_price(url, function(data){
   jsonpromovacances.price = data;
   return jsonpromovacances;
 });

 Scrap_Promovacances.promovacances_hotel(url, function(data){
    jsonpromovacances.hotel = data;
    return jsonpromovacances;
  });

  Scrap_Promovacances.promovacances_link(url, function(data){
     jsonpromovacances.link= data;
     return jsonpromovacances;
   });

 Scraping_voyagelastminute.voyagelastminute_price(url, function(data){
    jsonvoyagelastminute.price = data;
    return jsonvoyagelastminute;
  });

  Scraping_voyagelastminute.voyagelastminute_hotel(url, function(data){
     jsonvoyagelastminute.hotel = data;
     return jsonvoyagelastminute;
   });


   Scraping_voyagelastminute.voyagelastminute_link(url, function(data){
      jsonvoyagelastminute.link= data;
      return jsonvoyagelastminute;
    });

    Scrap_LookVoyage.lookvoyage_hotel(url, function(data){
       jsonlookvoyage.hotel= data;
       return jsonlookvoyage;
     });

     Scrap_LookVoyage.lookvoyage_price(url, function(data){
        jsonlookvoyage.price= data;
        return jsonlookvoyage;
      });

      Scrap_LookVoyage.lookvoyage_link(url, function(data){
         jsonlookvoyage.link= data;
         return jsonlookvoyage;
       });



var Bestdeal = function(jsonpromovacances,jsonvoyagelastminute,jsonlookvoyage){

   var pricepromovacances=parseInt(jsonpromovacances.price);
   var pricelookvoyage=parseInt(jsonlookvoyage.price);
   var pricevoyagelastminute=parseInt(jsonvoyagelastminute.price);

   var message="";
   var min;
   if(pricepromovacances<pricelookvoyage){
     if(pricepromovacances<pricevoyagelastminute)
     {
       min=promovacances_price;
     }
   }
   else if (pricevoyagelastminute<pricelookvoyage){
     if(pricevoyagelastminute<pricepromovacances){
       min=pricevoyagelastminute;
     }
   }
   else if (pricelookvoyage<pricepromovacances){
     if(pricelookvoyage<pricevoyagelastminute){
       min=pricelookvoyage;
     }
   }
   return min;
   callback(min);
 }



app.use(express.static(__dirname + '/public'));

app.get('/', function(req,res){
   res.sendfile(__dirname + '\\Main.html');
});

app.listen('3000')
console.log('Magic happens on port 3000');

exports.Bestdeal = Bestdeal;
exports.app= app;
