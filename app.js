var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// data parsing 
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());

// to automatically identify ejs files and public directory
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));




var PORT = 3000;

app.get('/', function(req, res){
    res.render("index");
});

app.get('/autocut', function(req, res){
    res.render("autocut");
});

app.get('/submersible', function(req, res){
    res.render("submersible");
});

app.get('/wavlyx', function(req, res){
    res.render("wavlyx");
});

app.get('/partner', function(req, res){
    res.render("partner");
});

app.listen(PORT, function(){
    console.log("app is started on port ", PORT, "!!!");
});