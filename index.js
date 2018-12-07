const express = require('express');
const mongoose= require('mongoose');
const cookieSession = require('cookie-session');
const passport = require ('passport'); 
const keys=require('./config/keys'); 
require('./models/User'); 
require('./services/passport'); // the order of the require statemants is important! in the reverse order we'll get an error because it will appear that we're attempting to make use of the user model before we actually defined it!


mongoose.connect(keys.mongoURI,  { useNewUrlParser: true });

const app = express(); 

app.use(
    cookieSession ({
        maxAge: 30 * 24 * 60 * 60 * 1000, //30 days.
        keys: [keys.cookieKey]
    })
);

//tell passport that it should make use of cookies to handle authentication
app.use(passport.initialize());
app.use(passport.session()); 

require('./routes/authRoutes')(app);  

const PORT = process.env.PORT || 5000;
app.listen(PORT);

/*
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

