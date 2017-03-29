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

  compute:function(url,callback){
      request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);
            var data,parent;
            var json = { price : "", hotel : "", link : ""};
            $('#ctl00_ctl00_body_wscBody_czPL_ctl00_pl > div > div.prodlistInner.ng-scope > div:nth-child(3) > div > div > a.col-xs-12.col-sm-2.pad0 > div > div > div.col-xs-2.col-xs-pull-4.col-sm-pull-0.col-sm-12.obj-price > strong').filter(function(){
                data=$(this);
                json.hotel = data.attr('content');
            })
            $('#ctl00_ctl00_body_wscBody_czPL_ctl00_pl > div > div.prodlistInner.ng-scope > div:nth-child(3) > div > div > div.col-xs-7.col-sm-5.text-left.pad0 > a > div > h4').filter(function(){
                data=$(this);
                json.price = data.attr('content');
            })
            $('#ctl00_ctl00_body_wscBody_czPL_ctl00_pl > div > div.prodlistInner.ng-scope > div:nth-child(3) > div > div > a.col-xs-12.col-sm-2.pad0 > div > div > div.col-xs-6.col-sm-12.cta-produit > span').filter(function(){
                data=$(this);
                json.link = data.attr('content');
            })

            }
            fs.writeFile('outputlookvoyage.json', JSON.stringify(json, null, 4))
            callback(JSON.stringify(json, null, 4));
        })

  }
}


console.log('File successfully written! - Check your project directory for the outputlookvoyage.json file');
