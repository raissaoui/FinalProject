var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');


function cleanData(text){
  text.replace(/(\r\n|\n|\r)/gm,"");
  text=text.trim();
  text=text.toLowerCase();
  text = text.replace(/[èéêë]/g,"e");
  return text.split(' ').join('-');
}



module.exports = {

  getpromovacances:function(destination,callback){

    var url ='http://www.promovacances.com/vacances-sejour-hotel/voyage-'+destination+'/#destinationZones=1761&departureCities=1188&themespace=sejour-voyage&departureDateRange=15&moteur=true';
      request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);
            var data,parent;
            var json = { price : "", hotel : "", link : ""};
            $('#coup-de-coeur-list > div:nth-child(1) > div > div.info > div.bloc-prix > div.prix > a > p:nth-child(2)').filter(function(){
                data=$(this);
                json.hotel = data.attr('content');
            })
            $('#coup-de-coeur-list > div:nth-child(1) > div > div.info > div.description > div > h3 > a').filter(function(){
                data=$(this);
                json.price = data.attr('content');
            })
            $('#coup-de-coeur-list > div:nth-child(1) > div > div.info > div.bloc-prestation > div > a').filter(function(){
                data=$(this);
                json.link = data.attr('content');
              })

              }
            fs.writeFile('outputpromovacances.json', JSON.stringify(json, null, 4))
            callback(JSON.stringify(json, null, 4));
          })

    }
  }


console.log('File successfully written! - Check your project directory for the outputpromovacances.json file');
