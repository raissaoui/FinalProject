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
var jsonpromovacances = { price: "" , hotel: "", link: "" };

var promovacances_price = function(url,callback){
  request(url, function(error, response, html){
      if(!error){
          var $ = cheerio.load(html);

      $('#coup-de-coeur-list > div:nth-child(1) > div > div.info > div.bloc-prix > div.prix > a > p:nth-child(2)').filter(function(){
          var data=$(this).text();
          price =data;
          jsonpromovacances.price = price;
          console.log(price);
        })
     }
     callback(price);
   })
 }
var promovacances_hotel = function(url,callback){
  request(url, function(error, response, html){
      if(!error){
          var $ = cheerio.load(html);

      $('#coup-de-coeur-list > div:nth-child(1) > div > div.info > div.description > div > h3 > a').filter(function(){
          var data=$(this).text();
          hotel =data;
          jsonpromovacances.hotel = hotel;
          console.log(hotel);
        })
           }
           callback(hotel);
         })
       }
var promovacances_link = function(url,callback){
  request(url, function(error, response, html){
      if(!error){
          var $ = cheerio.load(html);

      $('#coup-de-coeur-list > div:nth-child(1) > div > div.info > div.bloc-prestation > div > a').filter(function(){
          var data=$(this).text();
          link =data;
          jsonpromovacances.link = link;
          console.log(link);
        })
           }
           callback(link);
         })
       }



exports.promovacances_price=promovacances_price;
exports.promovacances_hotel=promovacances_hotel;
exports.promovacances_link=promovacances_link;
