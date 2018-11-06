Assignment 7: FS + EJS

Before accessing the app, a user must first create an account and then verify their account. 
The user is asked to input their first name, last name, email, username, and password. 
And their verification is dependent on having the correct email, username and password. 
User is only allowed to use the app if they can successfully verify their information. 

This app allows user to plug in an animal and a list of breeds  is generated.
The app uses the petfinder api.

In order to create this app, you will need to:
  
 1. Get an API key from petfinder and then put API key where it says apiKey
 2. install the following in your terminal where your js file is:
        
        npm install express
        npm install ejs
        npm install request
        npm install body-parser
        
Once everything is installed and set up, you can run the app in your terminal using node or nodemon. 
After, go to localhost/3000 and the user should see a form that asks them to input sign up information.  