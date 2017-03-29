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

getvoyagelastminute:function(destination,callback){
var destination=""
var url ='http://voyage.lastminute.com/serp.cms?s_c.de='+destination+'&s_dpci=PAR&s_aj=2';

      request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);
            var data,parent;
            var json = { price : "", hotel : "", link : ""};
            $('#mainWrap > div > div.results > div:nth-child(2) > div.info-wrap > div.price-wrap.right > div.price').filter(function(){
                data=$(this);
                json.hotel = data.attr('content');
            })
            $('#mainWrap > div > div.results > div:nth-child(2) > div.heading.clearfix > h3 > a').filter(function(){
                data=$(this);
                json.price = data.attr('content');
            })
            $('#mainWrap > div > div.results > div:nth-child(2)').filter(function(){
                data=$(this);
                json.link = data.attr('content');
            })

            }
            fs.writeFile('outputvoyagelastminute.json', JSON.stringify(json, null, 4))
            callback(JSON.stringify(json, null, 4));
          })

    }
  }



console.log('File successfully written! - Check your project directory for the outputvoyagelastminute.json file');
