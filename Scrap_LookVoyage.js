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
var jsonlookvoyage= { price: "" , hotel: "", link: "" };

var lookvoyage_price = function(url,callback){
  request(url, function(error, response, html){
      if(!error){
          var $ = cheerio.load(html);

      $('#ctl00_ctl00_body_wscBody_czPL_ctl00_pl > div > div.prodlistInner.ng-scope > div:nth-child(3) > div > div > a.col-xs-12.col-sm-2.pad0 > div > div > div.col-xs-2.col-xs-pull-4.col-sm-pull-0.col-sm-12.obj-price > strong').filter(function(){
          var data=$(this).text();
          price =data;
          jsonlookvoyage.price = price;
          console.log(price);
        })
     }
     callback(price);
   })
 }
var lookvoyage_hotel = function(url,callback){
  request(url, function(error, response, html){
      if(!error){
          var $ = cheerio.load(html);

      $('#ctl00_ctl00_body_wscBody_czPL_ctl00_pl > div > div.prodlistInner.ng-scope > div:nth-child(3) > div > div > div.col-xs-7.col-sm-5.text-left.pad0 > a > div > h4').filter(function(){
          var data=$(this).text();
          hotel =data;
          jsonlookvoyage.hotel = hotel;
          console.log(hotel);
        })
           }
           callback(hotel);
         })
       }
var lookvoyage_link = function(url,callback){
  request(url, function(error, response, html){
      if(!error){
          var $ = cheerio.load(html);

      $('#ctl00_ctl00_body_wscBody_czPL_ctl00_pl > div > div.prodlistInner.ng-scope > div:nth-child(3) > div > div > a.col-xs-12.col-sm-2.pad0 > div > div > div.col-xs-6.col-sm-12.cta-produit > span').filter(function(){
          var data=$(this).text();
          link =data;
          jsonlookvoyage.link = link;
          console.log(link);
        })
           }
           callback(link);
         })
       }



exports.lookvoyage_price=lookvoyage_price;
exports.lookvoyage_hotel=lookvoyage_hotel;
exports.lookvoyage_link=lookvoyage_link;
