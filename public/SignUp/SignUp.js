var http = require('http');
var fs = require('fs');
var formidable = require("formidable");
var util = require('util');

var server = http.createServer(function (req, res) {
    if (req.method.toLowerCase() == 'get') {
        displayForm(res);
    } else if (req.method.toLowerCase() == 'post') {
        processFormFieldsIndividual(req, res);
    }
});

function displayForm(res) {
    fs.readFile('../SignUp/SignUp.html', function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'text/html',
                'Content-Length': data.length
        });
        res.write(data);
        res.end();
    });
}

function processAllFieldsOfTheForm(req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {

        res.writeHead(200, {
            'content-type': 'text/plain'
        });
        res.write('received the data:\n\n');
        res.end(util.inspect({
            fields: fields,
            files: files
        }));
    });
}

function processFormFieldsIndividual(req, res) {

    var fields = [];
    var form = new formidable.IncomingForm();

    form.on('field', function (field, value) {
        console.log(field);
        console.log(value);
        fields[field] = value;
    });

    form.on('progress', function (bytesReceived, bytesExpected) {
        var progress = {
            type: 'progress',
            bytesReceived: bytesReceived,
            bytesExpected: bytesExpected
        };
        console.log(progress);
    });

    form.on('end', function () {
        res.writeHead(200, {
            'content-type': 'text/plain'
        });
        //res.write('received the data:\n\n');
        res.sendFile('../Account/MyAccount.html');
        res.end(util.inspect({
            fields: fields
        }));
    });
    form.parse(req);
}

server.listen(1185);
console.log("server listening on 1185");
