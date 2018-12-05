const express = require('express');
const passport= require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys'); 

const app = express(); 

passport.use(new GoogleStrategy({
    clientID : keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'

}, 
(accessToken) => {
    console.log(accessToken);
}));

// Tell express to involve passport, in order to pass the user off to where they will then be kicked into the authentication flow:
app.get(
    '/auth/google',
    passport.authenticate('google', 
        {scope: ['profile', 'email']
    }) 
); //whenever user come to this route we want to kick them out into our outh-flow, which is being entirely manage by passport. so we are asking passport to attempt to authenticate the user who is coming in on
// this route and use the strategy called 'google'. we had never explicitly said that the string 'google' is actually this GoogleStategy.  internally GoogleStrategy has some little bit of code that says I'm known as a 
//strategy called Google like the string 'google' in which we are using right here after autenticate: passport.authenticate('google', ...

const PORT = process.env.PORT || 5000;
app.listen(PORT);

/*

app- express app to register this route handler with
get- watch for incoming requests with this method
'/'- watch for requests trying to access '/'.
req- object representing the incoming request
res- object representing the outgoing response
res.send()- immediately send some JSON to who ever made this request

app.listen(5000)- this line instructs express to tell node that it wants to listen for incoming traffic on port 5000.
even though it looks like this is express listening to the port, express is really just kind of turn around and telling node.js 
(the runtime)-"hey, watch for any traffic coming in on port 5000". 
const PORT - the reason that i'm chosing to use capital letters is because I want to make sure tha'ts it's really clear to any 
other engineer who's looking at this in the future that this is some type of constant that should not be changed slightly. 
 process.env.PORT - Whenever heroku runs our app, it has the ability to inject environment variables - variables that are set in the underlying runtime that node is running 
 on top of. this line is actually says: "look at the underlying env. and see if they have declared a port for us to use". 

 const PORT = process.env.PORT || 5000- if there is an envitonment variable that has been already defined by heroku, go ahead and asign that variable 
 to PORT . otherwise, by default, use the value of 5000. 
 dev env- 5000, production - whatever port heroku is attempting to provide to us. 
 app.listen(PORT)- when we decide what port to listen to, rather than always listening to 5000, we'll listen to the PORT that we just calculated on line 8.
 
 Followup deployment: 
redploy my app: save every single file, git status, git add . , git commit -m "..", git push heroku master!
*/

