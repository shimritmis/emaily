const mongoose = require('mongoose');

const { Schema } = mongoose; // this is exactly the same as : const Schema = mongoose.Schema;

const userSchema = new Schema ({
    googleId: String,

});

mongoose.model('users', userSchema);

/* In order to create an actual model class and tell mongoose that it needs to be aware that this new collection needs to be created, 
 we'll use this line of code in the bottom: mongoose.model('<collection name>', <name of schema>);
we can easily add in/ substract an additional property, at any time. 
For everyting that uses mongoose model classes - we are not going to require statements. when we use mongoose inside a testing env over our codrbase, sometimes our model files we be 
required into the project multiple times. mongoose will get really confused when that happens and it will think that we are attempting to load in multiple models called users and then it 
will throw us an error saying that we've already loaded in something called 'users' before. that is why we're going to use a different fashion in order to require in the mongoose class. in passport.js
we're going to require mongoose and then create a const called User--> const user= mongoose.model('users'); check the order of the require statements in index.js (check comments)
*/ 