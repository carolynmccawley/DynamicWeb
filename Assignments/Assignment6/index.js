//Carolyn McCawley 
//Nov 6 Homework 
//Express app that uses an API

var express = require('express');
var bodyParser=require('body-parser');
var request = require('request');
var app = express();
var ejs = require('ejs');


var apiKey = '**********************';

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');

app.get('/',function(req,res){
    res.render('index',{breedList:null, error:null});
    //console.log("running");
});


app.post('/',function(req,res){
    //response.render('index');
    //return the animal breed that is searched
    //console.log(request.body.breed);
    var breed = req.body.breed;
    var url =`http://api.petfinder.com/breed.list?key=${apiKey}&animal=${breed}&format=json`;


    
    request(url, function (err, response, body) {
        //prints out a list of breeds based on user input
        //console.log(JSON.parse(body).petfinder.breeds.breed)
        if(err){
            res.render('index', {breedList: null, error: 'Error, please try again'});
        } else {
            //parses the data and if it exits, sends the list of breeds to the user
            var data = JSON.parse(body);
            var breedList = data.petfinder.breeds;
            if(breedList == undefined){
                res.render('index', {breedList: null, error: 'Error, please try again'});
            } else {
                //sends the list of breeds to the user
                res.render('index', {breedList: breedList.breed, error: null});
            }
        }
    });
})



app.listen(3000,function(){
    console.log("listening on port 3000");
})