//Carolyn McCawley -- Day 4 Homework

function Hangman() {
  //array of options
  this.answerOptions = ["hello","fox","Dumbledore"];
  //chooses one of the words at random
  this.answerNum = Math.floor(Math.random() * this.answerOptions.length);
  this.answer = this.answerOptions[this.answerNum];
  //user only has 8 guesses
  this.numGuess = 8;
  this.guessStringA = [];
  this.start = true;
  //will generate an array of underscores or empty letters at the beginning
  if (this.start) {
    for (var i =0; i<this.answer.length; i++) {
      this.guessStringA.push("_")
    }
    this.start = false;
  }
  //keeps track of if the game is done or not
  this.finished= false;
  //Number Guessing Function -- input enters their guess
  this.guess = function(guessedLetter){
    //Forces user to start a new game and doesn't continue game
    if (this.finished) {
    console.log("Start a new game");
    return
    }
    //will only let the user play if they haven't guessed too many times
    if (this.numGuess ==0) {
      console.log("You have incorrectly guessed to many times. Start a new game and try again");
      this.finished=true;
      return;
    }
    var found = false;
    //loops through the answer and if its found, it inserts it into the guess string array
    for (var k = 0; k < this.answer.length; k ++) {
      if (guessedLetter == this.answer[k]) {
        this.guessStringA[k]=guessedLetter;
        found = true;
      }
    }
    //there may be multiple of the same letter in one word and you only want to say this once
    if (found) {
      console.log("Congratulations! You have found a letter! " + this.guessStringA.join(''));
    }
    //after looking through string and its still not found, tell user the guess was incorrect and decrease the number of guesses they have left
    if (found == false) {
      console.log("You have guessed incorrectly");
      this.numGuess-=1;
    }
    //if the answer string and the guess string are the same then the user has won
    if (this.answer == this.guessStringA.join('')) {
      console.log("Congratulations! You have successfully guessed the word: " + this.answer);
      console.log("You can start a new game");
      this.finished = true;
    }
  }
  //helper functions that print answer and guesses
  this.printAnswer = function () {
    console.log(this.answer);
  }
  this.printGuessersAnswer = function() {
    console.log(this.guessStringA.join(''));
  }
}
//creates new game
var game1 = new Hangman();
//prints the answer and what the user has guesses
game1.printAnswer();
game1.printGuessersAnswer();
//testing object
game1.guess('h');
game1.guess('e');
game1.guess('l');
game1.guess('x');
game1.guess('r');
game1.guess('o');
game1.guess('f');
game1.guess('l');
game1.guess('q');
game1.guess('p');
game1.guess('t');
game1.guess('k');
game1.guess('n');