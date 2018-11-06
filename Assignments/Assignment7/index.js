//Carolyn McCawley 
//Nov 8 Homework 
//Express app that uses an API with new login and verification feature

var express = require('express');
var bodyParser=require('body-parser');
var request = require('request');
var app = express();
var ejs = require('ejs');


//data in json file that holds information about user
var fs = require('fs');
var data = fs.readFileSync('userData.json');
var userData = JSON.parse(data);


//INSERT API KEY HERE
var apiKey = '***********************';

//user is only allowed to use the search app if they have verified their account
var appAccess = false;

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');


app.get('/',function(req,res){
    //resetting the json file for every new user
    //sets the username, password and email to null
    //console.log('resetting the json file');
    userData.email =null;
    userData.password = null;
    userData.username = null;
    userData.firstName=null;
    userData.lastName = null;
    res.render('signUp');
    //console.log('sign up page running'); 
})

//Set the inputs equal to their values in the json file
app.post('/', function(req,res){
    var userEmail = req.body.email;
    var userName = req.body.username;
    var userPassword = req.body.password;
    var userfName = req.body.firstName;
    var userlName = req.body.lastName;
    userData["username"]=userName;
    userData["email"] = userEmail;
    userData["password"] = userPassword;
    userData["firstName"] = userfName;
    userData["lastName"] = userlName;
    var data = JSON.stringify(userData);
    //writing to the json file
    fs.writeFile('userData.json', data, finished);
        function finished(err) {
            console.log('got the user profile')
        } 
    //once user has created an account, it leads them to a page to verify their information
    res.redirect('/verify');
})


//verify account 
app.get('/verify', function(req,res){
    res.render('verify');
    //console.log('verify page is running');
})

app.post('/verify',function(req,res){
    var toCheckEmail = req.body.email;
    var toCheckName = req.body.username;
    var toCheckPassword = req.body.password;
    var verifyBool = false;
    //console.log('the user email is: ' + userData.email);
    //checks to make sure user inputs equal the values in the json files
    //if everything checks out, the user will be redirected to the search page to use the app
    if ((toCheckEmail == userData.email) && (toCheckName == userData.username) &&(toCheckPassword == userData.password)) {
        console.log('user has successfully logged in');
        verifyBool= true;
    } else {
        //if they fail to verify their account, they will be notified and told to try again
        res.send('Please go back to the verify page. You have failed to verify your login information');
    }
    if (verifyBool){ //user is redirected if they verify their account
        appAccess = true;
        res.redirect('/search');
    }
})


//search page aka where the user can find list of breeds
app.get('/search',function(req,res){
    if (appAccess) {
        res.render('index',{breedList:null, error:null});
    } else {
        res.send('Sorry, but you have not verified your account. Please go to localhost:3000 to sign up for an account please');
    }
    
});


app.post('/search',function(req,res){
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