var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();



app.get('/scrape', function(req, res){
  var pays="espagne";
  var prices;
  var url="http://www.promovacances.com/vacances-sejour-hotel/voyage-espagne/#destinationZones=1761&departureCities=1188&themespace=sejour-voyage&departureDateRange=15&moteur=true";

request(url, function(error, response, html){
    if(!error){
        var $ = cheerio.load(html);

        var json = { price: ""};

    $('#coup-de-coeur-list > div:nth-child(1) > div > div.info > div.bloc-prix > div.prix > a > p:nth-child(2)').filter(function(){
        var data=$(this).text();
        price =data;

        json.price = price;

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
