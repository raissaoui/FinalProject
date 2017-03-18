var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

function clean(text){
  text.replace(/(\r\n|\n|\r)/gm,"");
  text=text.trim();
  return text;
}

app.get('/scrape', function(req, res){
  var pays="espagne";
  var prices_LookVoyage;
  var url="http://www.look-voyages.fr/travel/productList.aspx?depcity=%3bPAR%3b&destinations=%3b156%3b157%3b158%3b215%3b216%3b217%3b218%3b219%3b221%3b223%3b3889%3b3956%3b&nbAdult=2&nbChild=0&depdatedelta=2#?leftpl=(%22minp%22!null,%22maxp%22!null,%22th%22!%5B%5D)";


  request(url, function(error, response, html){
    if(!error){
        var $ = cheerio.load(html);

        var json = { prices_LookVoyage : ""};

    $('#ctl00_ctl00_body_wscBody_czPL_ctl00_pl > div > div.prodlistInner.ng-scope > div:nth-child(3) > div > div > a.col-xs-12.col-sm-2.pad0 > div > div > div.col-xs-2.col-xs-pull-4.col-sm-pull-0.col-sm-12.obj-price > strong').filter(function(){
        var data=$(this).text();
        prices_LookVoyage =data;

        json.prices_LookVoyage = prices_LookVoyage;

    })
}

fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

    console.log('File successfully written! - Check your project directory for the output.json file');

})

res.send('Check your console!')

    }) ;
})

app.listen('3000');

console.log('Magic happens on port 3000');
