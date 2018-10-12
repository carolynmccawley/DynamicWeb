
console.log("The bot begins...");

var Twit = require('twit');

var config = require('./config.js');

//grab information from config and set to new Twit 
var T = new Twit(config);


//calls function every hour
//setInterval(astroTweets, 1000*60*60);

//every minute -- testing only do not leave for too long
//setInterval(astroTweets,1000*10)


//function that searches twitter for tweets that have words that have an astrological signs mentioned and also have a word from an array that I created
//After searching twitter, the chosen tweeted is tweeted by the twitterbot 
function astroTweets(){
	//array of all astrological signs
	const astroSigns = ["Aquarius", "Pisces", "Aries", "Taurus", "Gemini","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn"];
	//array of keywords that I will search for 
	const keyWords = ["because","have","must","need", "drama","hate"];
	//array of words that I don't want included in the twitterbot
	const avoidWords = ["diagnosis", "selling", "Buenas","characteristics","election"];

	//will only post tweet on twitter if true
	var continuePost = true;

	//chooses a random word from the astroSigns array and from  keyWords array
	var astroChoice = astroSigns[Math.floor(Math.random()*astroSigns.length)];
    var keyChoice = keyWords[Math.floor(Math.random()*keyWords.length)];
	
	//parameters that will be passed into the search query
	//searching for tweets that have an astrology sign AND a word from the keyWords array
	var params = {
	 	q: astroChoice + ' AND ' + keyChoice + ' AND I',
		count:1,
		lang:'en'
	}

	//create empty array and the compare avoidWords to an array that has the words of the chosen tweet
	//if any words are the same, add to empty array
	//at end only continute post if the created array is empty
	//aka the posted tweet doesn't have any words in it that I don't want
	function parseTweet(toParse) {
		toParse = toParse.substring(1, toParse.length+1)
		let words = toParse.split(" ");
		let finalArr = [];
		words.forEach((e1)=>avoidWords.forEach((e2)=>

			{if (e1 == e2){
				finalArr.push(e1)
			}
		}
		));
		//if any words in common then don't post the tweet
		if (finalArr.length != 0) {
			continuePost = false;
		}
	}


	//checks whether or not the tweet was posted
	function checkTweet(err,data,response){
		if (err) {
			console.log("it didn't work");
		} else {
			console.log("it worked!");
		}
	}


	//searches twitter and then posts the tweet 
	T.get('search/tweets', params, function(err, data, response){
		//debugging
		//console.log("Searching for " + params.q)
		//console.log(data);

		//if the search didn't find anything, then search again
		if (data.statuses == []) {
			console.log("No results: will do another search");
			astroTweets();
		}
		//take the text from the found tweet and assign it to a variable 
		var tweet = data.statuses[0].text;
		//check it tweet is useable 
		parseTweet(tweet);


		//if safe to Post, post the tweet
		if (continuePost) {
			T.post('statuses/update', {status: tweet}, checkTweet);
		}
		//check if rejected tweet
		//run through function again until a good tweet is found
		else {
			console.log("Tweet was not posted and will do another search");
			astroTweets();
		}		
	})

}

astroTweets();