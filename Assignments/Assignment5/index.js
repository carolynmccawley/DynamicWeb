//Class 14 Homework -- Carolyn McCawley
//Saving to a JSON file

var fs = require('fs');
var data = fs.readFileSync('pets.json');

var pets = JSON.parse(data);
//console.log(pets);


console.log("server is starting");

const express = require('express');
const app = express();

const server = app.listen(3000,listening)

function listening() {
	console.log('I am listening...');
}

app.use(express.static('public'));


//adding a pet into the pets json file
//if the pet already exists, it will be added to the array of owners
//if the pet isn't in the array, new key will be created that is associated with 
//an array of owners starting with the newly added person
//cannot have two pet owners with the same name IF they have the same pet
app.get('/add/:pet/:newName',addPet);
function addPet(request,response){
	var readData = request.params;
	var addPet = readData.pet;
	var addName = readData.newName;
	var addingNew = true;

	//only add pet to the array if its not already in there
	if(pets[addPet]){
		if (pets[addPet].includes(addName)){
			addingNew = false;
		} else {
			pets[addPet].push(addName);
		}
	} 
	//if pet isn't in file, add new key and array and then push name onto array
	else {
		pets[addPet] = [];
		pets[addPet].push(addName);
	}
	var data = JSON.stringify(pets);
	fs.writeFile('pets.json',data,finished);
	function finished(err){
		console.log('name has been added');
	}
	if (addingNew){
		var reply = {
			msg: "Your name has been added to the pets file and you are now listed as owning a" + addPet	
		}
	}
	else {
		var reply = {
			msg: "I'm sorry, this name is already listed as owning a " + addPet
		}
	}
	response.send(reply);

}



//see all of the data in the json file
//will show the pets and a list of people who own said animal
app.get('/all',sendData);
function sendData(request,response){
	response.send(pets);
}


//allows user to search for people who own a certain pet
app.get('/search/:searchPet',findPet);
function findPet(request,response){
	var searchPet = request.params.searchPet;
	var reply;
	if (pets[searchPet]) {
		reply = {
			status: 'found',
			pet: searchPet,
			petOwnerNames: pets[searchPet]
		}
	} else {
		reply = {
			status: 'not found. no one owns this pet',
			pet: searchPet
		}
	}
	response.send(reply)
}

