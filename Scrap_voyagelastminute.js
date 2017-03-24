var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();


function clean(text){
  text.replace(/(\r\n|\n|\r)/gm,"");
  text=text.trim();
  return text;
}

var price;
var link;
var hotel;
var jsonvoyagelastminute = { price: "" , hotel: "", link: "" };

var voyagelastminute_price = function(url,callback){
  request(url, function(error, response, html){
      if(!error){
          var $ = cheerio.load(html);

      $('#mainWrap > div > div.results > div:nth-child(2) > div.info-wrap > div.price-wrap.right > div.price').filter(function(){
          var data=$(this).text();
          price =data;
          jsonvoyagelastminute.price = price;
          console.log(price);
        })
     }
     callback(price);
   })
 }
var voyagelastminute_hotel = function(url,callback){
  request(url, function(error, response, html){
      if(!error){
          var $ = cheerio.load(html);

      $('#mainWrap > div > div.results > div:nth-child(2) > div.heading.clearfix > h3 > a').filter(function(){
          var data=$(this).text();
          hotel =data;
          jsonvoyagelastminute.hotel = hotel;
          console.log(hotel);
        })
           }
           callback(hotel);
         })
       }
var voyagelastminute_link = function(url,callback){
  request(url, function(error, response, html){
      if(!error){
          var $ = cheerio.load(html);

      $('#mainWrap > div > div.results > div:nth-child(2)').filter(function(){
          var data=$(this).text();
          link =data;
          jsonvoyagelastminute.link = link;
          console.log(link);
        })
           }
           callback(link);
         })
       }


       fs.writeFile('outputvoyagelastminute.json', JSON.stringify(jsonvoyagelastminute, null, 4), function(err){

                  console.log('File successfully written! - Check your project directory for the outputlookvoyage.json file');

       })

       app.get('/scrapevoyagelastminute', function(req, res){
         voyagelastminute_price;
         voyagelastminute_hotel;
         voyagelastminute_link;

       });
exports.voyagelastminute_price=voyagelastminute_price;
exports.voyagelastminute_hotel=voyagelastminute_hotel;
exports.voyagelastminute_link=voyagelastminute_link;

app.listen("3000");
