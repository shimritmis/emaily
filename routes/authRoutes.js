const passport = require('passport'); //this passport require has nothing to do with our passport.js. in this case, we're requiring the original passport npm module. 

module.exports = (app) => {
    // Tell express to involve passport, in order to pass the user off to where they will then be kicked into the authentication flow:
    app.get(
        '/auth/google',
        passport.authenticate('google', 
        {scope: ['profile', 'email']
    }) 
    ); //whenever user come to this route we want to kick them out into our outh-flow, which is being entirely manage by passport. so we are asking passport to attempt to authenticate the user who is coming in on
    // this route and use the strategy called 'google'. we had never explicitly said that the string 'google' is actually this GoogleStategy.  internally GoogleStrategy has some little bit of code that says I'm known as a 
    //strategy called Google like the string 'google' in which we are using right here after autenticate: passport.authenticate('google', ...
    
    app.get('/auth/google/callback', passport.authenticate('google')
    );
};



/*
first, in index.js we defined the app object, and hence we were working with the app obj ("app.get"(...)). the app obj was defined in the begining of the file: index.js. in order to use the app obj from index.js, we need:
1. use module.exports and wrap both of our route handlers. (both of our app.get(..)) 
2. add app as an argument to the function, because we are assuming that we'll call this function with our express app obj. 
3. at the top of index.js we'll import authRoutes.js. thus, authRoutes is a function that takes our app obj and attaches the latest two routes to it. 
4. in index.js, before PORT, call authRoutes with the app object - authRoutes(app) 
5. delete authRoutes variable in the begining of index.js (step no.3). delete authRoutes from step no.4. take the require statement ant put it at the end of index.js and before PORT. leave (app) next to it.
now, we only have this:
require('./routes/authRoutes')(app);
before const PORT.

require('./routes/authRoutes')(app)---->WHEN WE REQUIRE THIS authRoutes route in index.js IT RETURNS A FUNCTION FROM HERE, AND IMMEDIATELY CALL THAT FUNCTION WITH THE APP OBJECT. SO THE SECOND SET OF PARENTHESES (app)
IMMEDIATELY INVOKES THE FUNCTION THAT WE JUST REQUIRED IN. the app is passed into our arrow function in the authRoutes func, we attach the two handlers to it and we got two new routes. 


app- express app to register this route handler with
get- watch for incoming requests with this method
'/'- watch for requests trying to access '/'.
req- object representing the incoming request
res- object representing the outgoing response
res.send()- immediately send some JSON to who ever made this request
*/