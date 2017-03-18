/*var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();


/*var PromoVacances_price = function(url,callback){
  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);
        $('#coup-de-coeur-list > div:nth-child(1) > div > div.info > div.bloc-prix > div.prix > a').filter(function(){
          var data=$(this).text();

          price =data;

          console.log(price);
        })
    }
    callback(price);
  })
}

exports.PromoVacances_price = PromoVacances_price*/


//#col-droite > section.noResult

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
  var prices;
  var path="";
  var hotel="";
  var url="http://www.promovacances.com/vacances-sejour-hotel/voyage-"+pays+"/#destinationZones=1761&departureCities=1188&themespace=sejour-voyage&departureDateRange=15&moteur=true";

request(url, function(error, response, html){
    if(!error){
        var $ = cheerio.load(html);

        var json = { price: "" , hotel: "" };

    $('#coup-de-coeur-list > div:nth-child(1) > div > div.info > div.bloc-prix > div.prix > a > p:nth-child(2)').filter(function(){
        var data=$(this).text();
        price =data;
        json.price = price;
        console.log(price);
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
